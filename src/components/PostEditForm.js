import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IMAGE_FILTERS } from "../utils";
import Content from "./Content";
import btnStyles from "./Button.module.css";

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

  const textFields = (
    <>
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
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Row>
      <Col className="p-0 p-md-2" md={7} lg={8}>
        <Content>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              {image && (
                <figure className={image_filter}>
                  <Image style={{ width: "100%" }} src={image} />
                </figure>
              )}
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                htmlFor="image-upload"
              >
                change the image
              </Form.Label>
              <Row xs={4} sm={4} md={4} lg={5} xl={6}>
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
                        <Image style={{ width: "100%" }} src={image} />
                      </figure>
                    </div>
                  ))}
              </Row>
              <Form.File
                id="image-upload"
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
            <div className="d-md-none">{textFields}</div>
          </Form>
        </Content>
      </Col>
      <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
        <Content>{textFields}</Content>
      </Col>
    </Row>
  );
}

export default PostEditForm;
