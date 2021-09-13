import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router";
import Post from "../components/Post";
import { fetchMoreData, refreshToken } from "../utils";
import { ReactComponent as NoResults } from "../assets/no-results.svg";

import styles from "./PostsPage.module.css";
import Asset from "../components/Asset";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../App.module.css";
import PopularProfiles from "../components/PopularProfiles";

function PostsPage({ filter = "", message }) {
  const { pathname } = useLocation();
  const [posts, setPosts] = useState({ results: [] });
  const [query, setQuery] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => clearTimeout(timer);
  }, [query, pathname]);

  const fetchPosts = async () => {
    console.log("fetching data");
    // refreshToken
    await refreshToken();
    try {
      const { data: posts } = await axios.get(
        `/posts/?${filter}search=${query}`
      );
      setPosts(posts);
      setHasLoaded(true);
    } catch (err) {
      console.log(err.request);
    }
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
          <>
            <PopularProfiles mobile />
            <Form
              className={styles.SearchBar}
              onSubmit={(event) => event.preventDefault()}
            >
              <FormControl
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="search posts"
                className="mr-sm-2"
              />
            </Form>
            {posts.results.length ? (
              <InfiniteScroll
                dataLength={posts.results.length}
                next={() => fetchMoreData(posts, setPosts)}
                hasMore={!!posts.next}
                loader={<Asset children={<Spinner animation="border" />} />}
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset children={<NoResults />} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset children={<Spinner animation="border" />} />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
