const postResolvers = require('./posts')
const userResolvers = require('./users')

// Resolvers define the technique for fetching the types defined in the schema.
const resolvers = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    }
}

module.exports = resolvers