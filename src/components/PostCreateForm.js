import React, { useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router";

function PostCreateForm(props) {
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;
  const imageFile = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageFile.current.files[0]);
    try {
      await axios.post("/posts/", formData);
      history.push("/");
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Container>
      <h1>Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleChange}
            name="title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onChange={handleChange}
            name="content"
          />
        </Form.Group>
        <Form.Group>
          <Form.File
            label="Upload picture"
            ref={imageFile}
            accept="image/*"
            onChange={(e) =>
              setPostData({
                ...postData,
                image: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      {image && <Image src={image} thumbnail />}
    </Container>
  );
}

export default PostCreateForm;
