import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Post from "../components/Post";

function HomePage(props) {
  const { history } = props;
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get(`/posts/?search=${query}`)
      .then((response) => setPosts(response.data.results))
      .catch((err) => console.log(err.request));
  }, [query]);

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
        <Post key={post.id} {...post} history={history} />
      ))}
    </>
  );
}

export default HomePage;
