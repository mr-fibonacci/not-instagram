import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { NavLink, withRouter } from 'react-router-dom'

function NavBar(props) {
    const {currentUser, setCurrentUser, history} = props
    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/')
            setCurrentUser(null)
            history.push('/')
        } catch(err){
            console.log(err.request)
        }
    }
    return (
        <Navbar bg="dark" variant="dark">
            <NavLink to="/"><Navbar.Brand>not-instagram</Navbar.Brand></NavLink>
            <Nav className="mr-auto">
                {currentUser
                    ? <><Button onClick={handleSignOut} variant="outline-info">sign out</Button>
                    <NavLink to={`/profiles/${currentUser.pk}/`}><Button>profile</Button></NavLink>
                    </>
                    : <><NavLink to="/signin"><Button>sign in</Button></NavLink>
                    <NavLink to="/signup"><Button>sign up</Button></NavLink></>
                }
            </Nav>
        </Navbar>
    )
}

export default withRouter(NavBar)