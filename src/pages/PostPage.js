import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "../components/Comment";
import CommentCreateForm from "../components/CommentCreateForm";
import Button from "react-bootstrap/Button";
import { useHistory, useParams } from "react-router";
import Post from "../components/Post";

function PostPage(props) {
  const { id } = useParams();
  const history = useHistory();
  const [[post], setPost] = useState([{}]);
  const [comments, setComments] = useState({});
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
      {comments.results?.map((comment) => (
        <Comment
          key={comment.id}
          setPost={setPost}
          {...comment}
          setComments={setComments}
        />
      ))}
    </>
  );
}

export default PostPage;
