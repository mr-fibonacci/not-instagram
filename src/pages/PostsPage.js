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
import Content from "../components/Content";
import Spinner from "react-bootstrap/Spinner";

function PostsPage({ filter = "" }) {
  const { pathname } = useLocation();
  const [posts, setPosts] = useState({ results: [] });
  const [query, setQuery] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    handleMount();
  }, [query, pathname]);

  const handleMount = async () => {
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

  return hasLoaded ? (
    <>
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
          loader={<Asset children={<Spinner animation="border" />} />}
          children={posts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setPosts} />
          ))}
        />
      ) : (
        <Content>
          <Asset children={<NoResults />} />
        </Content>
      )}
    </>
  ) : (
    <Content>
      <Asset children={<Spinner animation="border" />} />
    </Content>
  );
}

export default PostsPage;