import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
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

export const REGISTER_USER = gql`
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

export const CREATE_POST = gql`
    mutation login($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
        }
    }
`