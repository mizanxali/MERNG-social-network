const gql = require('graphql-tag')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against your data.
const typeDefs = gql`
    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }

    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
    }

    type User {
        id: ID!,
        email: String!,
        token: String!,
        username: String!,
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        email: String!,
        password: String!,
        confirmPassword: String!
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. 
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    # The "Mutation" type is special: it lists all of the available mutations that
    # clients can execute, along with the argument list and return type for each.
    type Mutation {
        register(userData: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
`

module.exports = typeDefs