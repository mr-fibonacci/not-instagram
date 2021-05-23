import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

function CommentEditForm(props) {
  const { id } = props;
  const [content, setContent] = useState("");

  useEffect(() => {
    handleMount();
  }, []);

  const handleMount = async () => {
    try {
      const { data } = await axios.get(`/comments/${id}/`);
      console.log(data);
      setContent(data.content);
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/comments/${id}/`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>edit a comment</Form.Label>
          <Form.Control as="textarea" value={content} onChange={handleChange} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default CommentEditForm;
