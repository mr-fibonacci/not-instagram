import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import logo from "../logo.svg";
import addPost from "../add-post.svg";
import home from "../home.svg";
import heart from "../heart.svg";
import signout from "../signout.svg";
import feed from "../feed.svg";
import styles from "./NavBar.module.css";

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
    <Navbar className={styles.NavBar} sticky="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} height={45} />
          </Navbar.Brand>
        </NavLink>
        <Nav className="mr-auto">
          {currentUser ? (
            <>
              <NavLink to={"/posts/create"}>
                <img src={addPost} height={35} />
              </NavLink>
              <NavLink to={"/"}>
                <img src={home} height={35} />
              </NavLink>
              <NavLink to={"/feed"}>
                <img src={feed} height={35} />
              </NavLink>
              <NavLink to={"/liked"}>
                <img src={heart} height={35} />
              </NavLink>
              <NavLink to={`/profiles/${currentUser?.profile_id}`}>
                <img
                  src={currentUser?.profile_image}
                  height={35}
                  style={{ borderRadius: "5px" }}
                />
              </NavLink>
              <NavLink to="/" onClick={handleSignOut}>
                <img src={signout} height={35} />
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
