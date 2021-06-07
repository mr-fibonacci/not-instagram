import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router";

function SignInForm(props) {
  const { setCurrentUser } = props;
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data);
    }
  };
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <h1>Sign in</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            value={username}
            name="username"
          />{" "}
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
            onChange={handleChange}
            value={password}
            name="password"
          />{" "}
          {errors?.password?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}
        </Form.Group>
        <Button type="submit">sign in</Button>
        {errors?.non_field_errors?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
      </Form>
    </Container>
  );
}

export default SignInForm;
