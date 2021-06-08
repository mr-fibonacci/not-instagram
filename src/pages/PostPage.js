import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "../components/Comment";
import CommentCreateForm from "../components/CommentCreateForm";
import Button from "react-bootstrap/Button";
import { useHistory, useParams } from "react-router";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData, setNext } from "../utils";

function PostPage(props) {
  const { id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
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
      setPost({ results: [post] });
      setComments(setNext(comments));
    } catch (err) {
      console.log(err.request);
    }
  };

  return (
    <>
      <Post {...post.results[0]} setPosts={setPost} />
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
        next={() => fetchMoreData(comments, setComments)}
        hasMore={!!comments.next}
        loader={<h4>loading</h4>}
        endMessage={<p>everything has been loaded</p>}
      >
        {comments.results.map((comment) => (
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
