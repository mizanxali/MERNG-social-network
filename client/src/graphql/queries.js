import { gql } from '@apollo/client'

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likes {
                id
                username
            }
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`

export const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likes {
                id
                username
            }
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`