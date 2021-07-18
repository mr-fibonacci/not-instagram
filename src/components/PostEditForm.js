import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router";
import Row from "react-bootstrap/Row";
import { IMAGE_FILTERS } from "../utils";

function PostEditForm() {
  const { id } = useParams();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    image_filter: "normal",
  });
  const { title, content, image, image_filter } = postData;
  const imageFile = useRef();
  useEffect(() => {
    handleMount();
  }, []);

  const handleMount = async () => {
    try {
      const { data } = await axios.get(`/posts/${id}/`);
      const { title, content, image, image_filter } = data;
      setPostData({
        title,
        content,
        image,
        image_filter,
      });
    } catch (err) {
      console.log(err.response);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }
    formData.append("image_filter", image_filter);
    try {
      await axios.put(`/posts/${id}/`, formData);
      history.goBack();
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
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={content}
            onChange={handleChange}
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
      {image && (
        <figure className={image_filter}>
          <Image src={image} thumbnail />
        </figure>
      )}
      <Row xs={2} sm={3} md={4} lg={5} xl={6}>
        {image &&
          IMAGE_FILTERS.map((imageFilter) => (
            <div key={imageFilter.value}>
              <figure
                onClick={() =>
                  setPostData((prevState) => ({
                    ...prevState,
                    image_filter: imageFilter.value,
                  }))
                }
                className={imageFilter.value}
              >
                <Image src={image} thumbnail />
              </figure>
            </div>
          ))}
      </Row>
    </Container>
  );
}

export default PostEditForm;
