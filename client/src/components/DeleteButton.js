import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { FETCH_POSTS_QUERY } from '../graphql/queries'
import { DELETE_POST_MUTATION } from '../graphql/mutations'

function DeleteButton(props) {

    const [confirmOpen, setConfirmOpen] = useState(false)

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: {
            postId: props.post.id
        },
        update(proxy, result) {
            console.log('deleted');
            setConfirmOpen(false)

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
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
        </>
    )
}

export default DeleteButton
