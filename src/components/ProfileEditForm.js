import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router-dom";
import { useSetCurrentUser } from "../CurrentUserContext";
import Content from "./Content";
import btnStyles from "./Button.module.css";

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

  return (
    <Content>
      <h1>Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={handleChange}
            name="name"
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
              setProfileData({
                ...profileData,
                image: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
        </Form.Group>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          type="submit"
        >
          save
        </Button>
      </Form>
      {image && <Image src={image} thumbnail />}
    </Content>
  );
}

export default ProfileForm;
