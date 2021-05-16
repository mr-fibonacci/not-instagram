import React from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

function Post(props) {
    const { owner, profile_image, likes, like_id, title, content, image } = props
    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title><Image width='150px' src={profile_image} />
            </Card.Body>
            <Card.Img src={image}/>
            <Card.Body>
                <Card.Text>{content}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Post
