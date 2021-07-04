import React, { useState, useEffect } from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import NavBar from "./components/NavBar";
import "./axiosDefaults";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PostPage from "./pages/PostPage";
import PostCreateForm from "./components/PostCreateForm";
import ProfilePage from "./pages/ProfilePage";
import ProfileForm from "./components/ProfileForm";
import PostEditForm from "./components/PostEditForm";
import Container from "react-bootstrap/Container";
import PostsPage from "./pages/PostsPage";

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
        <Container style={{ maxWidth: "500px" }}>
          <Switch>
            <Route
              exact
              path="/signin"
              render={() => <SignInForm setCurrentUser={setCurrentUser} />}
            />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/" render={() => <PostsPage />} />
            <Route
              exact
              path="/feed"
              render={() => (
                <PostsPage
                  filter={`owner__followed__owner__profile=${currentUser?.profile_id}&`}
                />
              )}
            />
            <Route
              exact
              path="/liked"
              render={() => (
                <PostsPage
                  filter={`likes__owner__profile=${currentUser?.profile_id}&`}
                />
              )}
            />
            <Route
              exact
              path="/posts/create"
              render={() => <PostCreateForm />}
            />
            <Route
              exact
              path="/posts/:id/edit"
              render={() => <PostEditForm />}
            />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route
              exact
              path="/profiles/:id/edit"
              render={() => <ProfileForm />}
            />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
