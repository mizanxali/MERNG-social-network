const postResolvers = require('./posts')
const userResolvers = require('./users')
const commentResolvers = require('./comments')

// Resolvers define the technique for fetching the types defined in the schema.
const resolvers = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}

module.exports = resolvers