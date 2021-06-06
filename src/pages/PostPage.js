import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "../components/Comment";
import CommentCreateForm from "../components/CommentCreateForm";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";

function PostPage(props) {
  const { id } = props.match.params;
  const history = useHistory();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
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
      setPost(post);
      setComments(comments.results);
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}/`);
      history.pop();
    } catch (err) {
      console.log(err.request);
    }
  };
  console.log(post);
  return (
    <>
      {/* <Post {...post} /> */}
      {post.is_owner ? (
        <>
          <Button onClick={() => history.push(`/posts/${id}/edit`)}>
            edit
          </Button>
          <Button onClick={handleDelete}>delete</Button>
        </>
      ) : null}
      <CommentCreateForm
        post={id}
        comments={comments}
        setComments={setComments}
      />
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </>
  );
}

export default PostPage;
