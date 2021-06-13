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
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  const { title, content, image, blur, brightness, contrast, saturation } =
    postData;
  const imageFile = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageFile.current.files[0]);
    formData.append("blur", blur);
    formData.append("brightness", brightness);
    formData.append("contrast", contrast);
    formData.append("saturation", saturation);

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
          <Form.Label>content</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onChange={handleChange}
            name="content"
          />
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
      {image && (
        <Image
          style={{
            filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
          }}
          src={image}
          thumbnail
        />
      )}
    </Container>
  );
}

export default PostCreateForm;
