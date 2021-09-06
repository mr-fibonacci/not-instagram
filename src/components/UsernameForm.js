import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import btnStyles from "./Button.module.css";

const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put("/dj-rest-auth/user/", { username });
      console.log("change user name data", data);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <Form onSubmit={handleSubmit} className="my-2">
      <Form.Group>
        <Form.Label>change username</Form.Label>
        <Form.Control
          placeholder="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </Form>
  );
};

export default UsernameForm;
