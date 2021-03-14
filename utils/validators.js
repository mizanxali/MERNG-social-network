module.exports.validateRegisterInput = ( username, email, password, confirmPasword ) => {
    const errors = {}

    if(username.trim() === '') {
        errors.username = 'Username cannot be empty'
    }

    if(email.trim() === '') {
        errors.email = 'Email cannot be empty'
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if(!email.match(regEx)) {
            errors.email = 'Email is invalid'
        }
    }

    if(password === '') {
        errors.password = 'Password cannot be empty'
    } else {
        if(password!==confirmPasword) {
            errors.confirmPasword = 'Passwords do not match'
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length===0
    }
}

module.exports.validateLoginInput = ( username, password ) => {
    const errors = {}

    if(username.trim() === '') {
        errors.username = 'Username cannot be empty'
    }

    if(password === '') {
        errors.password = 'Password cannot be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length===0
    }
}