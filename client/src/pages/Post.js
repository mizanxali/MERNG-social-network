import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Card, Grid, Image, Button, Label, Icon } from 'semantic-ui-react'
import moment from 'moment'
import LikeButton from '../components/LikeButton'

import { FETCH_POST_QUERY } from '../graphql/queries'

import { AuthContext } from '../context/auth'
import DeleteButton from '../components/DeleteButton'

function Post(props) {

    const context = useContext(AuthContext)

    const postId = props.match.params.postId

    const { data, loading } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId: postId
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    let post

    if(!data) {
        post = <p>Loading post....</p>
    } else {
        const { id, body, createdAt, username, likes, comments } = data.getPost
        post = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                        floated='right'
                        size='small'
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton post={{ id, likes }} />
                                <Button labelPosition='right' as='div'>
                                    <Button color='blue' basic>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label basic color='blue' pointing='left'>
                                        {comments.length}
                                    </Label>
                                </Button>
                                {context.user && context.user.username===username && (
                                    <DeleteButton post={{ id }} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return post
}

export default Post
