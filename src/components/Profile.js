import React from 'react'
import { Media } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

function Profile(props) {
    const {owner, followers, following, following_id, name, content, image} = props
    return (
        <Media>
            <img  />
            <Media.Body>
                <h5>{owner}</h5>
            </Media.Body>
        </Media>
        // <Card>
        //     <Card.Header>{}</Card.Header>
        //     <Card.Body>
        //         <Card.Title></Card.Title>
        //     </Card.Body>
        // </Card>
    )
}

export default Profile
