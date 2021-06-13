import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router";

function PostEditForm() {
  const { id } = useParams();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  const { title, content, image, blur, brightness, contrast, saturation } =
    postData;
  const imageFile = useRef();
  useEffect(() => {
    handleMount();
  }, []);

  const handleMount = async () => {
    try {
      const { data } = await axios.get(`/posts/${id}/`);
      const { title, content, image } = data;
      setPostData({
        title,
        content,
        image,
        blur,
        brightness,
        contrast,
        saturation,
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
    formData.append("blur", blur);
    formData.append("brightness", brightness);
    formData.append("contrast", contrast);
    formData.append("saturation", saturation);
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
        {image && (
          <Image
            style={{
              filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
            }}
            src={image}
            thumbnail
          />
        )}
        <Form.Group>
          <Form.Label>Contrast</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="200"
            step="1"
            name="contrast"
            value={contrast}
            onChange={handleChange}
          />
          <Form.Label>Saturation</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="200"
            step="1"
            name="saturation"
            value={saturation}
            onChange={handleChange}
          />
          <Form.Label>Brightness</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="200"
            step="1"
            name="brightness"
            value={brightness}
            onChange={handleChange}
          />
          <Form.Label>Blur</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="3"
            step="0.01"
            name="blur"
            value={blur}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default PostEditForm;
