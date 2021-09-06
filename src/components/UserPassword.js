import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import btnStyles from "./Button.module.css";
import Alert from "react-bootstrap/Alert";

const UserPassword = () => {
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
    old_password: "",
  });
  const { new_password1, new_password2, old_password } = userData;
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "/dj-rest-auth/password/change/",
        userData
      );
      console.log("change user name data", data);
    } catch (err) {
      console.log(err.request);
      setErrors(err.response?.data);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>new password</Form.Label>
        <Form.Control
          placeholder="new password"
          type="text"
          value={new_password1}
          onChange={handleChange}
          name="new_password1"
        />
      </Form.Group>
      {errors?.new_password1?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>confirm password</Form.Label>
        <Form.Control
          placeholder="confirm new password"
          type="text"
          value={new_password2}
          onChange={handleChange}
          name="new_password2"
        />
      </Form.Group>
      {errors?.new_password2?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>old password</Form.Label>
        <Form.Control
          placeholder="old password"
          type="text"
          value={old_password}
          onChange={handleChange}
          name="old_password"
        />
      </Form.Group>
      {errors?.old_password?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Button type="submit" className={`${btnStyles.Button} ${btnStyles.Blue}`}>
        save
      </Button>
    </Form>
  );
};

export default UserPassword;
