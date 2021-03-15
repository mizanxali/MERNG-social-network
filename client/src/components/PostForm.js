import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { FETCH_POSTS_QUERY } from '../graphql/queries'

function PostForm() {

    const [errors, setErrors] = useState(null)
    const [values, setValues] = useState({
        body: ''
    })

    const [ createPost, { loading }] = useMutation(CREATE_POST, {
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
            setErrors(err)
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
                    <Form.Input error={errors && errors.graphQLErrors[0].message} type='text' placeholder='Hello World!' name='body' value={values.body} onChange={onChange} />
                    <Button type='submit' color='teal'>POST</Button>
                </Form.Field>
            </Form>
        </>
    )
}

const CREATE_POST = gql`
    mutation login($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
        }
    }
`

export default PostForm
