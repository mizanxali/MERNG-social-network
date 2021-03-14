const gql = require('graphql-tag')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against your data.
const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
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
    }

    type Mutation {
        register(userData: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`

module.exports = typeDefs