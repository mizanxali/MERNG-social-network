import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { FETCH_POSTS_QUERY } from '../graphql/queries'
import { CREATE_POST_MUTATION } from '../graphql/mutations'

function PostForm() {

    const [values, setValues] = useState({
        body: ''
    })

    const [ createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
        update(proxy, result) { //on successful mutation

            //UPDATE THE POSTS IN CACHE
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            const updatedData = {}
            updatedData.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: updatedData
            })

            values.body = ''
        },
        onError(err) {
            console.log(err);
        },
        variables: {
            body: values.body
        }
    })

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault()
        createPost()
    }

    return (
        <>
            <Form onSubmit={onSubmit} noValidate className={loading ?'loading' : ''}>
                <h1 className='page-title'>Create a Post</h1>
                <Form.Field>
                    <Form.Input error={error && error.graphQLErrors[0].message} type='text' placeholder='Hello World!' name='body' value={values.body} onChange={onChange} />
                    <Button type='submit' color='teal'>POST</Button>
                </Form.Field>
            </Form>
        </>
    )
}

export default PostForm
