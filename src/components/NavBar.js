import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";

import { NavLink, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo.svg";
import { ReactComponent as AddPost } from "../assets/add-post.svg";
import { ReactComponent as Home } from "../assets/home.svg";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as Signin } from "../assets/signin.svg";
import { ReactComponent as Signup } from "../assets/signup.svg";
import { ReactComponent as Signout } from "../assets/signout.svg";
import { ReactComponent as Feed } from "../assets/feed.svg";
import styles from "./NavBar.module.css";

import { useCurrentUser, useSetCurrentUser } from "../CurrentUserContext";
import { useClickOutsideToggle } from "../hooks";

import Avatar from "./Avatar";
import Icon from "./Icon";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();
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
    <Navbar
      expanded={expanded}
      expand="md"
      fixed="top"
      className={styles.NavBar}
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height={45} />
          </Navbar.Brand>
        </NavLink>
        {currentUser && (
          <NavLink to={"/posts/create"}>
            <i class="far fa-plus-square" /> add post
          </NavLink>
        )}
        <Navbar.Toggle
          ref={ref}
          aria-controls="navbar"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse className="justify-content-end" id="navbar">
          <Nav className="align-items-md-center">
            {currentUser ? (
              <>
                <NavLink exact activeClassName={styles.Active} to={"/"}>
                  <i class="fas fa-home" />
                  home
                </NavLink>
                <NavLink activeClassName={styles.Active} to={"/feed"}>
                  <i class="fas fa-stream" />
                  feed
                </NavLink>
                <NavLink activeClassName={styles.Active} to={"/liked"}>
                  <i class="fas fa-heart" />
                  liked
                </NavLink>
                <NavLink exact to="/" onClick={handleSignOut}>
                  <i class="fas fa-sign-out-alt" />
                  sign out
                </NavLink>
                <NavLink
                  activeClassName={styles.Active}
                  to={`/profiles/${currentUser?.profile_id}`}
                >
                  <Avatar src={currentUser?.profile_image} text="profile" />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink exact activeClassName={styles.Active} to={"/"}>
                  <i class="fas fa-home" />
                  home
                </NavLink>
                <NavLink activeClassName={styles.Active} to="/signin">
                  <i class="fas fa-sign-in-alt" />
                  sign in
                </NavLink>
                <NavLink activeClassName={styles.Active} to="/signup">
                  <i class="fas fa-user-plus" />
                  sign up
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
