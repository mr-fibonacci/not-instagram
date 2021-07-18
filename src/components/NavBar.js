import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";

import { NavLink, useHistory, withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import logo from "../logo.svg";
import { ReactComponent as AddPost } from "../add-post.svg";
import { ReactComponent as Home } from "../home.svg";
import { ReactComponent as Heart } from "../heart.svg";
import { ReactComponent as Signin } from "../signin.svg";
import { ReactComponent as Signup } from "../signup.svg";
import { ReactComponent as Signout } from "../signout.svg";
import { ReactComponent as Feed } from "../feed.svg";
import styles from "./NavBar.module.css";

import Avatar from "./Avatar";
import Icon from "./Icon";

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
            <Avatar src={logo} height={45} />
          </Navbar.Brand>
        </NavLink>
        <Nav>
          {currentUser ? (
            <>
              <NavLink to={"/posts/create"}>
                <Icon component={AddPost} />
              </NavLink>
              <NavLink activeClassName={styles.Active} to={"/"}>
                <Icon component={Home} />
              </NavLink>
              <NavLink to={"/feed"}>
                <Icon component={Feed} />
              </NavLink>
              <NavLink to={"/liked"}>
                <Icon component={Heart} />
              </NavLink>
              <NavLink to={`/profiles/${currentUser?.profile_id}`}>
                <Avatar src={currentUser?.profile_image} />
              </NavLink>
              <NavLink to="/" onClick={handleSignOut}>
                <Icon component={Signout} />
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/"}>
                <Icon component={Home} />
              </NavLink>
              <NavLink to="/signin">
                <Icon component={Signin} />
              </NavLink>
              <NavLink to="/signup">
                <Icon component={Signup} />
              </NavLink>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default withRouter(NavBar);
