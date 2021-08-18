import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router";
import Content from "./Content";
import styles from "./SignInUpForm.module.css";
import btnStyles from "./Button.module.css";
import { NavLink } from "react-router-dom";
import { useSetCurrentUser } from "../CurrentUserContext";
import Button from "react-bootstrap/Button";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
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
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Content>
        <h1 className={styles.Header}>sign in</h1>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group>
            <Form.Control
              placeholder="username"
              className={styles.Input}
              type="text"
              onChange={handleChange}
              value={username}
              name="username"
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
              onChange={handleChange}
              value={password}
              name="password"
            />
            {errors?.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
          </Form.Group>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
          >
            sign in
          </Button>
          {errors?.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}
        </Form>
      </Content>
      <Content>
        <NavLink className={styles.Link} to="/signup">
          Don't have an account? <span>Sign up now!</span>
        </NavLink>
      </Content>
    </>
  );
}

export default SignInForm;
