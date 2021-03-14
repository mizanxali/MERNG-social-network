const { AuthenticationError } = require('apollo-server')
const Post = require('../../models/Post')
const checkAuth = require('../../utils/check-auth')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 })
                return posts
            } catch(err) {
                throw new Error(err)
            }
        },
        async getPost(parent, args) {
            try {
                const post = await Post.findById(args.postId)
                if(post)
                    return post
                else
                    throw new Error('Post not found')
            } catch(err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(parent, args, context) {
            const user = checkAuth(context)

            if(args.body.trim() === '')
                throw new Error('Post cannot be empty')
            
            const newPost = new Post({
                body: args.body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const res = await newPost.save()

            return res
        },
        
        async deletePost(parent, args, context) {
            const user = checkAuth(context)

            try {
                const post = await Post.findById(args.postId)

                //check if user is deleting their own post
                if(post.username === user.username) {
                    await post.delete()
                    return 'Post deleted successfully'
                } else {
                    throw new AuthenticationError('Not allowed to do that')
                }
            } catch(err) {
                throw new Error(err)
            }
        },

        async likePost(parent, args, context) {
            const user = checkAuth(context)

            const post = await Post.findById(args.postId)

            if(post) {
                if(post.likes.find(like => like.username === user.username)) {
                    //post already liked, unlike it
                    post.likes = post.likes.filter(like => like.username!==user.username)
                } else {
                    //post not liked, like it
                    post.likes.push({
                        username: user.username,
                        createdAt: new Date().toISOString()
                    })
                }
                await post.save()
                return post
            } else {
                throw new UserInputError('Post not found')
            }
        }
    }
}