import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router";
import Post from "../components/Post";
import { fetchMoreData, setNext } from "../utils";
import { ReactComponent as NoResults } from "../assets/no-results.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./PostsPage.module.css";

function PostsPage({ filter = "" }) {
  const { pathname } = useLocation();
  const [posts, setPosts] = useState({ results: [] });
  const [query, setQuery] = useState("");

  useEffect(() => {
    handleMount();
  }, [query, pathname]);

  const handleMount = async () => {
    try {
      const { data: posts } = await axios.get(
        `/posts/?${filter}search=${query}`
      );
      setPosts(setNext(posts));
    } catch (err) {
      console.log(err.request);
    }
  };

  return (
    <Row>
      <Col lg={9}>
        <Form className={styles.SearchBar}>
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
            children={posts.results.map((post) => (
              <Post key={post.id} {...post} setPosts={setPosts} />
            ))}
          />
        ) : (
          <NoResults
            style={{
              border: "2px black solid",
            }}
          />
        )}
      </Col>
      <Col className="d-none d-lg-block">Popular profiles</Col>
    </Row>
  );
}

export default PostsPage;
