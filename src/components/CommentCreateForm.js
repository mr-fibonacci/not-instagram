import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CommentCreateForm(props) {
  const { post, comments, setComments } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/comments/", { content, post });
      setComments((prevComments) => [data, ...prevComments]);
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
