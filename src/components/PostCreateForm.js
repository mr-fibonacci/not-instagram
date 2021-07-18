import React, { useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router";
import { IMAGE_FILTERS } from "../utils";
import Badge from "react-bootstrap/Badge";

function PostCreateForm(props) {
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    image_filter: "normal",
  });
  const { title, content, image, image_filter } = postData;
  const imageFile = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageFile.current.files[0]);
    formData.append("image_filter", image_filter);

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

export default PostCreateForm;
