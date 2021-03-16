import React, { useContext, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Card, Grid, Image, Button, Label, Icon, Form } from 'semantic-ui-react'
import moment from 'moment'
import LikeButton from '../components/LikeButton'

import { FETCH_POST_QUERY } from '../graphql/queries'
import { CREATE_COMMENT_MUTATION } from '../graphql/mutations'

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

    const [comment, setCommment] = useState('')

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        variables: {
            postId: postId,
            body: comment
        },
        update(proxy, result) {
            setCommment('')
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
                        {context.user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Add a new comment</p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input type='text' placeholder='Your thoughts...' value={comment} onChange={(event) => setCommment(event.target.value)} />
                                            <button type='submit' className='ui button teal' disabled={comment.trim()===''} onClick={createComment}>POST</button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => {
                            return (
                                <Card fluid key={comment.id}>
                                    <Card.Content>
                                    {context.user && context.user.username===comment.username && (
                                        <DeleteButton post={{ id }} commentId={comment.id} />
                                    )}
                                        <Card.Header>{comment.username}</Card.Header>
                                        <Card.Meta>{moment(comment.createdAt).fromNow(true)}</Card.Meta>
                                        <Card.Description>{comment.body}</Card.Description>
                                    </Card.Content>
                                </Card>
                            )
                        })}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return post
}

export default Post
