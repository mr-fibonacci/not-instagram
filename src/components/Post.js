import axios from "axios";
import React, { useEffect, useState } from "react";
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
  } = props;
  const history = useHistory();
  const [toggleLikeId, setToggleLikeId] = useState(like_id);
  const [toggleLikes, setToggleLikes] = useState(likes);

  useEffect(() => {
    setToggleLikes(likes);
  }, [likes]);

  const handleLike = async () => {
    try {
      const { data } = await axios.post("/likes/", { post: id });
      setToggleLikeId(data.id);
      setToggleLikes((prevCount) => prevCount + 1);
    } catch (err) {
      console.log(err.request);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.delete(`/likes/${toggleLikeId}/`);
      setToggleLikeId(null);
      setToggleLikes((prevCount) => prevCount - 1);
    } catch (err) {
      console.log(err.request);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}/`);
      history.push(`/profiles/${profile_id}`);
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
            {owner}{" "}
          </Link>
          <Media.Body className="align-self-center" align="center">
            <h5>{title}</h5>
          </Media.Body>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} />
      </Link>
      <Card.Header>
        {toggleLikeId ? (
          <Button onClick={handleUnlike}>unlike</Button>
        ) : (
          <Button onClick={handleLike}>like</Button>
        )}
        Likes: {toggleLikes} Comments: {comments}
        {is_owner ? (
          <>
            <Button onClick={() => history.push(`/posts/${id}/edit`)}>
              edit
            </Button>
            <Button onClick={handleDelete}>delete</Button>
          </>
        ) : null}
      </Card.Header>
      <Card.Body>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Post;
