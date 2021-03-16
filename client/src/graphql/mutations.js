import { gql } from '@apollo/client'

export const LOGIN_USER_MUTATION = gql`
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

export const REGISTER_USER_MUTATION = gql`
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

export const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
        }
    }
`

export const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                createdAt
            }
        }
    }
`

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

export const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID! $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                body
            }
        }
    }
`

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($postId: ID! $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
        }
    }
`