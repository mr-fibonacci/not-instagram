import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router-dom";
import { useSetCurrentUser } from "../CurrentUserContext";
import btnStyles from "./Button.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import appStyles from "../App.module.css";
import Container from "react-bootstrap/Container";

function ProfileForm() {
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;
  const imageFile = useRef();
  useEffect(() => {
    handleMount();
  }, []);

  const handleMount = async () => {
    try {
      const { data } = await axios.get(`/profiles/${id}/`);
      const { name, content, image } = data;
      setProfileData({ name, content, image });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }
    try {
      const { data } = await axios.put(`/profiles/${id}/`, formData);
      console.log(data);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={handleChange}
          name="name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>content</Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
          rows={6}
        />
      </Form.Group>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form className="h-100" onSubmit={handleSubmit}>
      <Row className="h-100">
        <Col className="my-auto p-0 p-md-2" md={7} lg={6}>
          <Container className={appStyles.Content}>
            {image && (
              <figure>
                <Image className="d-block m-auto" src={image} />
              </figure>
            )}
            <Form.Label
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
              htmlFor="image-upload"
            >
              change the image
            </Form.Label>
            <Form.File
              id="image-upload"
              ref={imageFile}
              accept="image/*"
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  image: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="my-auto d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ProfileForm;
