import React, { useContext } from 'react'
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

function PostCard(props) {

    const context = useContext(AuthContext)

    const { id, body, createdAt, username, likes, comments } = props.post

    return (
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton post={{ id, likes }} />
                <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {comments.length}
                    </Label>
                </Button>
                {context.user && context.user.username===username && (
                    <DeleteButton post={{ id }} />
                )}
            </Card.Content>
        </Card>
    )
}

export default PostCard
