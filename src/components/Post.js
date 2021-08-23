import axios from "axios";
import React from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as HeartRed } from "../assets/heart-red.svg";
import { ReactComponent as Comment } from "../assets/comment.svg";
import styles from "./Post.module.css";
import Icon from "./Icon";
import MoreDropdown from "./MoreDropdown";
import { useCurrentUser } from "../CurrentUserContext";

function Post(props) {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    image_filter,
    setPosts,
    handleEdit,
    handleDelete,
    postPage,
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
      const { data } = await axios.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
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
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
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
            <Avatar src={profile_image} height={45} />
            {owner}
          </Link>
          <Media.Body className="align-self-center" align="center">
            <h5>{title}</h5>
          </Media.Body>
          {is_owner && postPage && (
            <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        {image_filter === "normal" ? (
          <Card.Img src={image} />
        ) : (
          <figure className={image_filter}>
            <Image alt={title} className={styles.PostImage} src={image} />
          </figure>
        )}
      </Link>

      <div className={styles.PostBar}>
        {is_owner ? (
          <Icon component={HeartRed} />
        ) : like_id ? (
          <span onClick={handleUnlike}>
            <Icon component={HeartRed} />
          </span>
        ) : (
          <span onClick={handleLike}>
            <Icon component={Heart} />
          </span>
        )}
        {likes_count}
        <Link to={`/posts/${id}`}>
          <Icon component={Comment} />
        </Link>
        {comments_count}
        <span style={{ marginLeft: "12px", marginRight: "7px" }}>
          {image_filter === "normal" ? "#nofilter" : `#${image_filter}`}
        </span>
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