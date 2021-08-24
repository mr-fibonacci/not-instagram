import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router";
import styles from "./SignInUpForm.module.css";
import btnStyles from "./Button.module.css";
import { NavLink } from "react-router-dom";
import { useSetCurrentUser } from "../CurrentUserContext";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import appStyles from "../App.module.css";

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
    <Row style={{ border: "2px black solid", height: "100%" }}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={appStyles.Content}>
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
              type="submit"
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
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <NavLink className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </NavLink>
        </Container>
      </Col>
      <Col md={6} className="my-auto d-none d-md-block p-0 p-md-2">
        filler graphic
      </Col>
    </Row>
  );
}

export default SignInForm;
