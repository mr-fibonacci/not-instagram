import React from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import NavBar from "./components/NavBar";
import "./axiosDefaults";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import PostPage from "./pages/PostPage";
import PostCreateForm from "./components/PostCreateForm";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditForm from "./components/ProfileEditForm";
import PostEditForm from "./components/PostEditForm";
import Container from "react-bootstrap/Container";
import PostsPage from "./pages/PostsPage";
import styles from "./App.module.css";
import Layout from "./pages/Layout";
import { useCurrentUser } from "./CurrentUserContext";
import Content from "./components/Content";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <Router>
        <NavBar />
        <Container className="min-vh-100" style={{ paddingTop: "81px" }}>
          <Switch>
            <Route
              exact
              path="/signin"
              render={() => (
                <Layout
                  width={6}
                  panel={
                    <Content>
                      <h1>filler graphic</h1>
                    </Content>
                  }
                >
                  <SignInForm />
                </Layout>
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <Layout
                  width={6}
                  panel={
                    <Content>
                      <h1>filler graphic</h1>
                    </Content>
                  }
                >
                  <SignUpForm />
                </Layout>
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Layout>
                  <PostsPage />
                </Layout>
              )}
            />
            <Route
              exact
              path="/feed"
              render={() => (
                <Layout>
                  <PostsPage
                    filter={`owner__followed__owner__profile=${profile_id}&`}
                  />
                </Layout>
              )}
            />
            <Route
              exact
              path="/liked"
              render={() => (
                <Layout>
                  <PostsPage filter={`likes__owner__profile=${profile_id}&`} />
                </Layout>
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
                  <ProfileEditForm />
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
