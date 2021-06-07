import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/comments/${id}/`, { content: formContent });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? { ...comment, content: formContent }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            as="textarea"
            value={formContent}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">save</Button>
      </Form>
    </Container>
  );
}

export default CommentEditForm;
