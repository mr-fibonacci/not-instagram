import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "../components/Comment";
import CommentCreateForm from "../components/CommentCreateForm";
import Post from "../components/Post";

function PostPage(props) {
  const { id } = props.match.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    handleMount();
  }, []);
  const handleMount = async () => {
    try {
      const [postReq, commentsReq] = await Promise.all([
        axios.get(`/posts/${id}`),
        axios.get(`/comments/?post=${id}`),
      ]);
      setPost(postReq.data);
      setComments(commentsReq.data.results);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <>
      <Post {...post} />
      <CommentCreateForm />
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </>
  );
}

export default PostPage;
