import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Post(props) {
  const {
    id,
    owner,
    is_owner,
    profile_id,
    profile_image,
    comments,
    likes,
    like_id,
    title,
    content,
    image,
    setPosts,
  } = props;
  const history = useHistory();

  const handleLike = async () => {
    try {
      const { data } = await axios.post("/likes/", { post: id });
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          return post.id === id
            ? { ...post, likes: post.likes + 1, like_id: data.id }
            : post;
        })
      );
    } catch (err) {
      console.log(err.request);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          return post.id === id
            ? { ...post, likes: post.likes - 1, like_id: null }
            : post;
        })
      );
    } catch (err) {
      console.log(err.request);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <img
              width="70px"
              className="align-self-center"
              src={profile_image}
            />
            {owner}
          </Link>
          <Media.Body className="align-self-center" align="center">
            <h5>{title}</h5>
          </Media.Body>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} />
      </Link>
      <Card.Body>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      <Card.Header>
        {like_id ? (
          <Button onClick={handleUnlike}>unlike</Button>
        ) : (
          <Button onClick={handleLike}>like</Button>
        )}
        Likes: {likes} Comments: {comments}
      </Card.Header>
    </Card>
  );
}

export default Post;
