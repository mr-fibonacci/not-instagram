import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function NavBar() {
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        handleMount()
    }, [])
    const handleMount = async () => {
        try {
            const { data } = await axios.get('dj-rest-auth/user/', {withCredentials: true})
            console.log('current User:', data)
            setCurrentUser(data)
        } catch(err) {
            console.log(err.request)
        }
    }
    const handleSignOut = async () => {
        try {
            const { data } = await axios.post('dj-rest-auth/logout/')
            console.log(data)
            setCurrentUser(null)
        } catch(err){
            console.log(err.request)
        }
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">not-insta</Navbar.Brand>
            <Nav className="mr-auto">
                <Form inline>
                    <FormControl type="text" placeholder="search posts" className="mr-sm-2" />
                </Form>
                {currentUser
                    ? <Button onClick={handleSignOut} variant="outline-info">sign out</Button>
                    : <><Nav.Link href="#home">sign in</Nav.Link>
                    <Nav.Link href="#features">sign up</Nav.Link></>
                }
            </Nav>
        </Navbar>
    )
}

export default NavBar
