import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";

function NavBar(props) {
  const { currentUser, setCurrentUser } = props;
  const history = useHistory();
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push("/");
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>moments</Navbar.Brand>
        </NavLink>
        <Nav className="mr-auto">
          {currentUser ? (
            <>
              <Button onClick={handleSignOut} variant="light">
                sign out
              </Button>
              <NavLink to={`/profiles/${currentUser.profile_id}`}>
                <Button variant="light">profile</Button>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/signin">
                <Button variant="light">sign in</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button variant="light">sign up</Button>
              </NavLink>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default withRouter(NavBar);
