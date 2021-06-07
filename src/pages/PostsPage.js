import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { useLocation } from "react-router";
import Post from "../components/Post";

function PostsPage({ filter = "" }) {
  const { pathname } = useLocation();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  console.log(`/posts/?${filter}search=${query}`);
  useEffect(() => {
    axios
      .get(`/posts/?${filter}search=${query}`)
      .then((response) => setPosts(response.data.results))
      .catch((err) => console.log(err.request));
  }, [query, pathname]);

  return (
    <>
      <Form inline>
        <FormControl
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="search posts"
          className="mr-sm-2"
        />
      </Form>
      {posts.map((post) => (
        <Post key={post.id} {...post} setPosts={setPosts} />
      ))}
    </>
  );
}

export default PostsPage;
