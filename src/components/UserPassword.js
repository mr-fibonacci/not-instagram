import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const UserPassword = () => {
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
    old_password: "",
  });
  const { new_password1, new_password2, old_password } = userData;
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
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          placeholder="new password"
          type="text"
          value={new_password1}
          onChange={handleChange}
          name="new_password1"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          placeholder="confirm new password"
          type="text"
          value={new_password2}
          onChange={handleChange}
          name="new_password2"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          placeholder="old password"
          type="text"
          value={old_password}
          onChange={handleChange}
          name="old_password"
        />
      </Form.Group>
      <Button type="submit">update password</Button>
    </Form>
  );
};

export default UserPassword;
