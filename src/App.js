import React, { useState, useEffect } from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import NavBar from "./components/NavBar";
import "./axiosDefaults";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import PostCreateForm from "./components/PostCreateForm";
import ProfilePage from "./pages/ProfilePage";
import ProfileForm from "./components/ProfileForm";
import PostEditForm from "./components/PostEditForm";
import Container from "react-bootstrap/Container";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    handleMount();
  }, []);
  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      console.log("current User:", data);
      setCurrentUser(data);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Container>
          <Switch>
            <Route
              exact
              path="/signin"
              render={(routeProps) => (
                <SignInForm {...routeProps} setCurrentUser={setCurrentUser} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={(routeProps) => <SignUpForm {...routeProps} />}
            />
            <Route
              exact
              path="/"
              render={(routeProps) => <HomePage {...routeProps} />}
            />
            <Route
              exact
              path="/posts/create"
              render={(routeProps) => <PostCreateForm {...routeProps} />}
            />
            <Route
              exact
              path="/posts/:id/edit"
              render={(routeProps) => <PostEditForm {...routeProps} />}
            />
            <Route
              exact
              path="/posts/:id"
              render={(routeProps) => <PostPage {...routeProps} />}
            />
            <Route
              exact
              path="/profiles/:id"
              render={(routeProps) => <ProfilePage {...routeProps} />}
            />
            <Route
              exact
              path="/profiles/:id/edit"
              render={(routeProps) => <ProfileForm {...routeProps} />}
            />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
