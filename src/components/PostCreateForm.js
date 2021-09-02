import React, { useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router";
import { ReactComponent as Upload } from "../assets/upload.svg";
import btnStyles from "./Button.module.css";
import Asset from "./Asset";
import FilterSlider from "./FilterSlider";
import Container from "react-bootstrap/Container";
import appStyles from "../App.module.css";
import Alert from "react-bootstrap/Alert";

function PostCreateForm() {
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    image_filter: "normal",
  });
  const { title, content, image, image_filter } = postData;
  const [errors, setErrors] = useState({});
  const imageFile = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageFile.current.files[0]);
    formData.append("image_filter", image_filter);

    try {
      const { data } = await axios.post("/posts/", formData);
      console.log("data", data);
      history.push("/");
    } catch (err) {
      console.log("ERROR", err.request);
      setErrors(err.response?.data);
    }
  };
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  const handleClick = (newFilter) => {
    setPostData((prevState) => ({
      ...prevState,
      image_filter: newFilter,
    }));
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={handleChange}
          name="title"
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={content}
          onChange={handleChange}
          name="content"
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="p-0 p-md-2" md={7} lg={8}>
          <Container
            style={{
              minHeight: "352px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={appStyles.Content}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure className={image_filter}>
                    <Image
                      style={{ objectFit: "cover" }}
                      className={appStyles.Image}
                      src={image}
                    />
                  </figure>
                  {errors?.image?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                      {message}
                    </Alert>
                  ))}
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Blue}`}
                    htmlFor="image-upload"
                    style={{
                      display: "block",
                      maxWidth: "190px",
                      margin: "10px auto",
                    }}
                  >
                    change the image
                  </Form.Label>
                  <FilterSlider
                    image={image}
                    image_filter={image_filter}
                    handleClick={handleClick}
                  />
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset children={<Upload />} />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setPostData({
                      ...postData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
