import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router";

function PostEditForm() {
  const { id } = useParams();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;
  const imageFile = useRef();

  useEffect(() => {
    handleMount();
  }, []);

  const handleMount = async () => {
    try {
      const { data } = await axios.get(`/posts/${id}/`);
      const { title, content, image } = data;
      setPostData({ title, content, image });
    } catch (err) {
      console.log(err.response);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageFile.current.files[0]);
    try {
      await axios.put(`/posts/${id}/`, formData);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}/`);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <Container>
      <h1>Post</h1>
      <Button onClick={handleDelete}>delete</Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control type="text" value={title} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control as="textarea" value={content} onChange={handleChange} />
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

export default PostEditForm;
