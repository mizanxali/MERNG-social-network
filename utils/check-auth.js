const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config')

module.exports = (context) => {
    const authHeader = context.req.headers.authorization //Bearer <token>
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if(token) {
            //check if token is valid
            try {
                const user = jwt.verify(token, JWT_SECRET)
                return user
            } catch(error) {
                throw new AuthenticationError('Invalid/expired token')
            }
        }
        throw new AuthenticationError('Auth token is badly formatted')
    }
    throw new AuthenticationError('Auth header is missing')
}