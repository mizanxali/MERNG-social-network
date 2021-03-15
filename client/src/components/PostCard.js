import React from 'react'
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

function PostCard(props) {

    const { id, body, createdAt, username, likes, comments } = props.post

    const likePost = () => {
        console.log('liked');
    }

    const commentOnPost = () => {
        console.log('liked');
    }

    return (
        <Card fluid as={Link} to={`/posts/${id}`}>
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
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='teal' basic>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        {likes.length}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={commentOnPost}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {comments.length}
                    </Label>
                </Button>
            </Card.Content>
            </Card>
    )
}

export default PostCard
