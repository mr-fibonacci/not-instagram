import axios from 'axios';
import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'

function CommentForm() {
    const [content, setContent] = useState('');
    
    useEffect(() => {
        handleMount()
    }, [])
    
    const handleMount = async () => {
        const { data } = await axios.get('/comments/1/')
        console.log(data)
        setContent(data.content)
    }
    const handleChange = (event) => {
        setContent(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const {data} = await axios.put('/comments/1/')
        } catch(err){
            console.log(err)
        }
    }
    return (
        <Container>
            <h1>Comment</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>content</Form.Label>
                    <Form.Control as="textarea" value={content} onChange={handleChange} />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm
