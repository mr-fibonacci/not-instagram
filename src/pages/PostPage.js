import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "../components/Comment";
import CommentCreateForm from "../components/CommentCreateForm";
import { useHistory, useParams } from "react-router";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../utils";
import Content from "../components/Content";
import { useCurrentUser } from "../CurrentUserContext";
import Asset from "../components/Asset";
import Spinner from "react-bootstrap/Spinner";

function PostPage() {
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
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
      setComments(comments);
    } catch (err) {
      console.log(err.request);
    }
  };

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err.request);
    }
  };

  return (
    <>
      <Post
        {...post.results[0]}
        setPosts={setPost}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        postPage
      />
      <Content>
        {currentUser && (
          <>
            <CommentCreateForm
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
            <hr />
          </>
        )}

        <InfiniteScroll
          dataLength={comments.results.length}
          next={() => fetchMoreData(comments, setComments)}
          hasMore={!!comments.next}
          loader={<Asset children={<Spinner animation="border" />} />}
          children={comments.results.map((comment) => (
            <Comment
              key={comment.id}
              setPost={setPost}
              {...comment}
              setComments={setComments}
            />
          ))}
        />
      </Content>
    </>
  );
}

export default PostPage;
