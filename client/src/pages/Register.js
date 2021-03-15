import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { AuthContext } from '../context/auth'

const Register = (props) => {

    const context = useContext(AuthContext)

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [ registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) { //on successful mutation
            context.login(result.data.register)
            props.history.push('/')
        },
        onError(err) { //on failed mutation
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            username: values.username,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        }
    })

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault()
        registerUser()
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ?'loading' : ''}>
                <h1 className='page-title'>Register</h1>
                <Form.Input error={errors.username} type='text' label='Username' placeholder='Username' name='username' value={values.username} onChange={onChange} />
                <Form.Input error={errors.email} type='email' label='Email' placeholder='Email' name='email' value={values.email} onChange={onChange} />
                <Form.Input error={errors.password} type='password' label='Password' placeholder='Password' name='password' value={values.password} onChange={onChange} />
                <Form.Input error={errors.confirmPassword} type='password' label='Confirm Password' placeholder='Confirm Password' name='confirmPassword' value={values.confirmPassword} onChange={onChange} />
                <Button type='submit' primary>Register</Button>
            </Form>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register($username: String! $email: String! $password: String! $confirmPassword: String!) {
        register(userData: {
            username: $username,
            email: $email,
            password: $password,
            confirmPassword: $confirmPassword
        }) {
            id
            email
            username
            createdAt
            token
        }
    }
`

export default Register
