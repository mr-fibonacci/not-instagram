import React from 'react'
import Card from 'react-bootstrap/Card'

function Comment(props) {
    const {content} = props
    return (
        <Card>
            <Card.Body>
                <Card.Text>{content}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Comment
