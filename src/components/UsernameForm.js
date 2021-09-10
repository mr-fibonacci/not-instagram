import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import btnStyles from "./Button.module.css";

const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    handleMount();
  }, []);
  const handleMount = async () => {
    try {
      const { data } = await axios.get("/dj-rest-auth/user/");
      console.log(data);
      setUsername(data.username);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put("/dj-rest-auth/user/", { username });
      console.log("change user name data", data);
    } catch (err) {
      console.log(err.request);
      setErrors(err.response?.data);
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
      {errors?.username?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </Form>
  );
};

export default UsernameForm;
