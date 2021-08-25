import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import styles from "./SignInUpForm.module.css";
import btnStyles from "./Button.module.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../App.module.css";
import { Image } from "react-bootstrap";

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
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={appStyles.Content}>
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
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
            >
              sign up
            </Button>
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <NavLink className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </NavLink>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-0 p-md-2`}
        style={{ height: "375px" }}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://res.cloudinary.com/dgjrrvdbl/image/upload/v1/media/images/pexels-photo-2710131-cropped_cp37ty"
          }
        />
      </Col>
    </Row>
  );
}

export default SignUpForm;
