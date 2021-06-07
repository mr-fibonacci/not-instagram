import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "../components/Comment";
import CommentCreateForm from "../components/CommentCreateForm";
import Button from "react-bootstrap/Button";
import { useHistory, useParams } from "react-router";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";

function PostPage(props) {
  const { id } = useParams();
  const history = useHistory();
  const [[post], setPost] = useState([{}]);
  const [comments, setComments] = useState({ count: 0, results: [] });
  useEffect(() => {
    handleMount();
  }, []);
  const handleMount = async () => {
    try {
      const [{ data: post }, { data: comments }] = await Promise.all([
        axios.get(`/posts/${id}`),
        axios.get(`/comments/?post=${id}`),
      ]);
      console.log("post", post);
      setPost([post]);
      setComments({
        ...comments,
        // this bit only for development (localhost instead of gitpod's url)
        next: comments.next
          ? comments.next.replace(
              "http://localhost:8000",
              axios.defaults.baseURL
            )
          : null,
      });
    } catch (err) {
      console.log(err.request);
    }
  };

  const fetchMoreComments = async () => {
    try {
      const { data } = await axios.get(comments.next);
      setComments((prevComments) => ({
        ...data,
        next: data.next
          ? data.next.replace("http://localhost:8000", axios.defaults.baseURL)
          : null,
        results: data.results.reduce((acc, cur) => {
          return acc.some((result) => result.id === cur.id)
            ? acc
            : [...acc, cur];
        }, prevComments.results),
      }));
    } catch (err) {
      console.log(err.request);
    }
  };

  return (
    <>
      <Post {...post} setPosts={setPost} />
      {post.is_owner ? (
        <Button onClick={() => history.push(`/posts/${id}/edit`)}>edit</Button>
      ) : null}
      Create a comment
      <CommentCreateForm
        post={id}
        setPost={setPost}
        setComments={setComments}
      />
      <InfiniteScroll
        dataLength={comments.results.length}
        next={fetchMoreComments}
        hasMore={!!comments.next}
        loader={<h4>loading</h4>}
        endMessage={<p>everything has been loaded</p>}
        scrollableTarget="scrollable-div"
      >
        {comments.results?.map((comment) => (
          <Comment
            key={comment.id}
            setPost={setPost}
            {...comment}
            setComments={setComments}
          />
        ))}
      </InfiniteScroll>
    </>
  );
}

export default PostPage;
