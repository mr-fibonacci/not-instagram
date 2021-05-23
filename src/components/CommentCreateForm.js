import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function CommentCreateForm() {
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/comments/", { content });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>create a comment</Form.Label>
        <Form.Control as="textarea" value={content} onChange={handleChange} />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default CommentCreateForm;
