import React from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import NavBar from "./components/NavBar";
import "./axiosDefaults";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostPage from "./pages/PostPage";
import PostCreateForm from "./components/PostCreateForm";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditForm from "./components/ProfileEditForm";
import PostEditForm from "./components/PostEditForm";
import Container from "react-bootstrap/Container";
import PostsPage from "./pages/PostsPage";
import styles from "./App.module.css";
import { useCurrentUser } from "./CurrentUserContext";
import { LastLocationProvider } from "react-router-last-location";
import UsernameForm from "./components/UsernameForm";
import UserPasswordForm from "./components/UserPasswordForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <Router>
        <LastLocationProvider>
          <NavBar />
          <Container style={{ paddingTop: "81px" }}>
            <Switch>
              <Route
                exact
                path="/signin"
                render={(props) => <SignInForm {...props} />}
              />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route
                exact
                path="/"
                render={() => (
                  <PostsPage message="No results found. Adjust the search keyword." />
                )}
              />
              <Route
                exact
                path="/feed"
                render={() => (
                  <PostsPage
                    message="No results found. Adjust the search keyword or follow a user."
                    filter={`owner__followed__owner__profile=${profile_id}&`}
                  />
                )}
              />
              <Route
                exact
                path="/liked"
                render={() => (
                  <PostsPage
                    message="No results found. Adjust the search keyword or like a post."
                    filter={`likes__owner__profile=${profile_id}&`}
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
              <Route
                exact
                path="/profiles/:id"
                render={() => <ProfilePage />}
              />
              <Route
                exact
                path="/profiles/:id/edit"
                render={() => <ProfileEditForm />}
              />
              <Route
                exact
                path="/profiles/:id/edit/username"
                render={() => <UsernameForm />}
              />
              <Route
                exact
                path="/profiles/:id/edit/password"
                render={() => <UserPasswordForm />}
              />
            </Switch>
          </Container>
        </LastLocationProvider>
      </Router>
    </div>
  );
}

export default App;
