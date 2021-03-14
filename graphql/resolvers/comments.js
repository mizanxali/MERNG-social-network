const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post')
const checkAuth = require('../../utils/check-auth')

module.exports = {
    Mutation: {
        async createComment(parent, args, context) {
            const user = checkAuth(context)

            if(args.body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment cannot be empty'
                    }
                })
            }
            
            const post = await Post.findById(args.postId)

            if(post) {
                post.comments.unshift({
                    body: args.body,
                    username: user.username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            } else {
                throw new UserInputError('Post not found')
            }
        },

        async deleteComment(parent, args, context) {
            const user = checkAuth(context)

            const post = await Post.findById(args.postId)

            if(post) {
                const removeIndex = post.comments.findIndex(comment => comment.id === args.commentId)
                if(post.comments[removeIndex].username===user.username) {
                    post.comments.splice(removeIndex, 1)
                    await post.save()
                    return post
                } else {
                    throw new AuthenticationError('Not allowed to do that')
                }
            } else {
                throw new UserInputError('Post not found')
            }
        }
    }
}