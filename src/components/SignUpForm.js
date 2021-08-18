import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router";
import Content from "./Content";
import { NavLink } from "react-router-dom";
import styles from "./SignInUpForm.module.css";
import btnStyles from "./Button.module.css";
import Button from "react-bootstrap/Button";

function SignUpForm() {
  const history = useHistory();
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
      console.log(err.response?.data);
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Content>
        <h1 className={styles.Header}>sign up</h1>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group>
            <Form.Control
              placeholder="username"
              className={styles.Input}
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
            <Form.Control
              placeholder="password"
              className={styles.Input}
              type="password"
              name="password1"
              onChange={handleChange}
              value={password1}
            />
            {errors?.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="confirm password"
              className={styles.Input}
              type="password"
              name="password2"
              onChange={handleChange}
              value={password2}
            />
            {errors?.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
          </Form.Group>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
          >
            sign up
          </Button>
        </Form>
      </Content>
      <Content>
        <NavLink className={styles.Link} to="/signin">
          Already have an account? <span>Sign in</span>
        </NavLink>
      </Content>
    </>
  );
}

export default SignUpForm;
