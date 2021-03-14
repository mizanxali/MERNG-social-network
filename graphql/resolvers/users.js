const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const { JWT_SECRET } = require('../../config')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')

function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username
    }
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: 360000})
    return token
}

module.exports = {
    Mutation: {
        async register(parent, args, context, info) {

            // Validate user data
            const { valid, errors } = validateRegisterInput(args.userData.username, args.userData.email, args.userData.password, args.userData.confirmPassword)
            if(!valid) {
                throw new UserInputError('Validation Errors', { errors })
            }

            // Check if username is already taken
            const userWithTakenUsername = await User.findOne({ username: args.userData.username })
            if(userWithTakenUsername) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is already taken'
                    }
                })
            }

            // Hash password and create new User object and save it to database
            const hashedPassword = await bcrypt.hash(args.userData.password, 12)
            const newUser = new User({
                email: args.userData.email,
                username: args.userData.username,
                password: hashedPassword,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save()

            // Create auth token
            const token = generateToken(res)

            // return the new User object plus the token
            return {
                ...res._doc,
                id: res._id,
                token
            }
        },
        
        async login(parent, args, context, info) {

            // Validate user data
            const { valid, errors } = validateLoginInput(args.username, args.password)
            if(!valid) {
                throw new UserInputError('Validation Errors', {
                    errors
                })
            }

            // check if user does not exist
            const user = await User.findOne({username: args.username})
            if(!user) {
                errors.general = 'Username not found'
                throw new UserInputError('Username not found', { errors })
            }

            // check if password is correct
            const doPasswordsMatch = await bcrypt.compare(args.password, user.password)
            if(!doPasswordsMatch) {
                errors.general = 'Invalid credentials'
                throw new UserInputError('Invalid credentials', { errors })
            }

            // Create auth token
            const token = generateToken(user)

            // return the User object plus the token
            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
}