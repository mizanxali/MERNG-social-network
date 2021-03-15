import React, { useEffect, useState, useContext } from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import { LIKE_POST_MUTATION } from '../graphql/mutations'

function LikeButton(props) {
    const context = useContext(AuthContext)

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if(context.user && props.post.likes.find(like => like.username===context.user.username)) {
            setLiked(true)
        }
        else {
            setLiked(false)
        }
    }, [context.user, props.post.likes])
 
    const onClick = () => {
        likePost()
    }

    const [likePost, { loading }] = useMutation(LIKE_POST_MUTATION, {
        variables: {
            postId: props.post.id
        }
    })

    const likeButton = context.user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='teal' basic>
                <Icon name='heart' />
            </Button>
        )) : (
            <Button color='teal' basic as={Link} to='/login'>
                <Icon name='heart' />
            </Button>
        )

    return (
        <Button as='div' labelPosition='right' onClick={onClick}>
            {likeButton}
            <Label basic color='teal' pointing='left'>
                {props.post.likes.length}
            </Label>
        </Button>
    )
}

export default LikeButton
