import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { FETCH_POSTS_QUERY } from '../graphql/queries'
import { DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from '../graphql/mutations'

function DeleteButton(props) {

    const [confirmOpen, setConfirmOpen] = useState(false)

    const mutation = props.commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrMutation] = useMutation(mutation, {
        variables: {
            postId: props.post.id,
            commentId: props.commentId
        },
        update(proxy, result) {
            setConfirmOpen(false)

            if(!props.commentId) {
                //UPDATE THE POSTS IN CACHE
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                })
                const updatedData = {}
                updatedData.getPosts = data.getPosts.filter(post => post.id!==props.post.id)
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: updatedData
                })
            }

            if(props.callback)
                props.callback()
        },
        onError(err){
            console.log(err);
        }
    })

    return (
        <>
            <Button as='div' color='red' floated='right' onClick={() => setConfirmOpen(true)}>
                <Icon name='trash' style={{margin: '0'}} />
            </Button>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrMutation} />
        </>
    )
}

export default DeleteButton
