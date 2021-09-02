import React from "react";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../CurrentUserContext";
import Avatar from "./Avatar";
import MoreDropdown from "./MoreDropdown";
import btnStyles from "./Button.module.css";
import styles from "./Profile.module.css";
import { Col, Row } from "react-bootstrap";

function Profile(props) {
  const {
    profile,
    handleFollow,
    handleUnfollow,
    imageSize = 45,
    stats = true,
  } = props;
  const {
    id,
    content,
    posts_count,
    followers_count,
    following_count,
    following_id,
    image,
    name,
    owner,
  } = profile;
  const history = useHistory();
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  return (
    <Row className="my-2">
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className="ml-3" style={{ wordBreak: "break-all" }}>
        <div>
          <b>{owner}</b>
        </div>
        {stats && (
          <div className={styles.Stats}>
            posts: {posts_count} followers: {followers_count} following:{" "}
            {following_count}
          </div>
        )}
      </div>
      <div className="text-right ml-auto">
        {currentUser &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            !is_owner && (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            )
          ))}
      </div>
    </Row>
  );
}

export default Profile;
