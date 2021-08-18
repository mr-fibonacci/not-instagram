import React from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import NavBar from "./components/NavBar";
import "./axiosDefaults";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import PostPage from "./pages/PostPage";
import PostCreateForm from "./components/PostCreateForm";
import ProfilePage from "./pages/ProfilePage";
import ProfileForm from "./components/ProfileForm";
import PostEditForm from "./components/PostEditForm";
import Container from "react-bootstrap/Container";
import PostsPage from "./pages/PostsPage";
import styles from "./App.module.css";
import Layout from "./pages/Layout";
import { useCurrentUser } from "./CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <Router>
        <NavBar />
        <Container className="min-vh-100" style={{ paddingTop: "85px" }}>
          <Switch>
            <Route
              exact
              path="/signin"
              render={() => (
                <Layout>
                  <SignInForm />
                </Layout>
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <Layout>
                  <SignUpForm />
                </Layout>
              )}
            />
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
              render={() => (
                <Layout>
                  <PostCreateForm />
                </Layout>
              )}
            />
            <Route
              exact
              path="/posts/:id/edit"
              render={() => (
                <Layout>
                  <PostEditForm />
                </Layout>
              )}
            />
            <Route
              exact
              path="/posts/:id"
              render={() => (
                <Layout>
                  <PostPage />
                </Layout>
              )}
            />
            <Route
              exact
              path="/profiles/:id"
              render={() => (
                <Layout>
                  <ProfilePage />
                </Layout>
              )}
            />
            <Route
              exact
              path="/profiles/:id/edit"
              render={() => (
                <Layout>
                  <ProfileForm />
                </Layout>
              )}
            />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
