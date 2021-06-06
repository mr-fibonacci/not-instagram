import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

function SignUpForm(props) {
  const { history } = props;
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const { username, password1, password2 } = signUpData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "/dj-rest-auth/registration/",
        signUpData
      );
      console.log(data);
      history.push("/signin");
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data);
    }
  };

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <h1>Sign up</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
          />
          {errors?.username?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            name="password1"
            onChange={handleChange}
            value={password1}
          />{" "}
          {errors?.password1?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label>confirm password</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            onChange={handleChange}
            value={password2}
          />{" "}
          {errors?.password2?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}
        </Form.Group>
        <Button type="submit">sign up</Button>
      </Form>
    </Container>
  );
}

export default SignUpForm;
