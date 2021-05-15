import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'

function PostForm() {
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        image: ''
    })
    const {title, content, image} = postData
    const imageFile = useRef();
    useEffect(() => {
        handleMount()
    }, [])

    const handleMount = async () => {
        const {data} = await axios.get('/posts/1/')
        console.log(data)
        const {title, content, image} = data
        setPostData({title, content, image})
    }
    const handleSubmit = async (event) => {
        event.prefentDefault();
        const formData = new FormData();
        formData.append('title', title)
        formData.append('content', content)
        formData.append('image', imageFile.current.files[0])
        try {
            const {data} = await axios.put('/posts/1/', formData)
        } catch(err){
            console.log(err)
        }
    }
    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value
        })
    }
    return (
        <Container>
            <h1>Post</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>title</Form.Label>
                    <Form.Control type="text" value={title} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>content</Form.Label>
                    <Form.Control as="textarea" value={content} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.File label="Upload picture" ref={imageFile} accept="image/*" />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            {image && <Image src={image} thumbnail />}
        </Container>
    )
}

export default PostForm
