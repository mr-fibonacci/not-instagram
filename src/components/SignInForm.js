import React, { useRef, useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function SignInForm() {
    const [signInData, setSignInData] = useState({
        username: '', password: ''
    })
    const {username, password} = signInData
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post('/dj-rest-auth/login/', signInData)
            console.log(data)
        } catch(err){
            console.log(err)
        }
    }
    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Container>
            <h1>Sign in</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={username} name="username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" onChange={handleChange} value={password} name="password" />
                </Form.Group>
                <Button type="submit">sign in</Button>
            </Form>
        </Container>
    )
}

export default SignInForm
