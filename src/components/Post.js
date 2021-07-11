import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import heart from "../heart.svg";
import heartRed from "../heart-red.svg";
import comment from "../comment.svg";
import styles from "./Post.module.css";

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
    blur,
    brightness,
    contrast,
    saturation,
    setPosts,
  } = props;

  const handleLike = async () => {
    try {
      const { data } = await axios.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes: post.likes + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err.request);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes: post.likes - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err.request);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <img
              width="50px"
              className="align-self-center"
              src={profile_image}
              alt={title}
              style={{ borderRadius: 20 }}
            />
            {owner}
          </Link>
          <Media.Body className="align-self-center" align="center">
            <h5>{title}</h5>
          </Media.Body>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img className={styles.PostImage} src={image} />
        {/* <img className={styles.PostImage} src={image} /> */}
      </Link>

      <div className={styles.PostBar}>
        {/* <Card.Header> */}
        {is_owner ? (
          <img src={heartRed} />
        ) : like_id ? (
          <img src={heartRed} onClick={handleUnlike} />
        ) : (
          <img src={heartRed} onClick={handleLike} />
        )}
        {likes} <img src={comment} /> {comments}
        {/* </Card.Header> */}
      </div>
      {content && (
        <Card.Body>
          <Card.Text>
            <b>{owner}</b> {content}
          </Card.Text>
        </Card.Body>
      )}
    </Card>
  );
}

export default Post;
