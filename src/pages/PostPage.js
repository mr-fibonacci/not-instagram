import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "../components/Comment";
import CommentCreateForm from "../components/CommentCreateForm";
import { useHistory, useParams } from "react-router";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../utils";
import { useCurrentUser } from "../CurrentUserContext";
import Asset from "../components/Asset";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../App.module.css";
import PopularProfiles from "../components/PopularProfiles";

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
    <Row className="h-100">
      <Col className="p-0 p-md-2" md={8}>
        <Post
          {...post.results[0]}
          setPosts={setPost}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          postPage
        />
        <Container className={appStyles.Content}>
          {currentUser && (
            <>
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                post={id}
                setPost={setPost}
                setComments={setComments}
              />
            </>
          )}
          {comments.results.length ? (
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
          ) : (
            "No comments yet, be the first one to comment!"
          )}
        </Container>
      </Col>
      <Col md={4} className="d-none d-md-block p-0 p-md-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostPage;
