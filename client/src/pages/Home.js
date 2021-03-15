import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../graphql/queries'

const Home = () => {

    const context = useContext(AuthContext)

    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY)
    console.log(error);

    return (
        <Grid columns={3}>
            {context.user && <Grid.Row className='page-title'>
                <h1>Welcome back, {context.user.username}</h1>
            </Grid.Row> }
            <Grid.Row>
                {context.user && (
                    <Grid.Column style={{marginBottom: '20px'}}>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (<h1>Loading posts....</h1>) : (
                    data.getPosts && data.getPosts.map(post => {
                        return (
                        <Grid.Column key={post.id} style={{marginBottom: '20px'}}>
                            <PostCard post={post} />
                        </Grid.Column>)
                    })
                )}
            </Grid.Row>
        </Grid>
    )
}

export default Home
