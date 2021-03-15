import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { AuthContext } from '../context/auth'

const Login = (props) => {

    const context = useContext(AuthContext)

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const [ loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, result) { //on successful mutation
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(err) { //on failed mutation
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            username: values.username,
            password: values.password,
        }
    })

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault()
        loginUser()
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ?'loading' : ''}>
                <h1 className='page-title'>Login</h1>
                <Form.Input error={errors.username} type='text' label='Username' placeholder='Username' name='username' value={values.username} onChange={onChange} />
                <Form.Input error={errors.password} type='password' label='Password' placeholder='Password' name='password' value={values.password} onChange={onChange} />
                <Button type='submit' primary>Login</Button>
            </Form>
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login($username: String! $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`

export default Login
