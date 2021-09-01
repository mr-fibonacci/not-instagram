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

function Profile(props) {
  const {
    profile,
    handleFollow,
    handleUnfollow,
    imageSize = 50,
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
    <div className="d-flex my-2  text-center justify-content-between">
      <Link className="align-self-center" to={`/profiles/${id}`}>
        <Avatar src={image} height={imageSize} />
      </Link>
      <div
        className={`d-flex flex-column justify-content-center ${
          !stats && "flex-fill"
        }`}
        style={{ wordBreak: "break-all" }}
      >
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
      <div
        className=" d-flex align-items-center justify-content-center"
        style={{ minWidth: "90px" }}
      >
        <div>
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
      </div>
    </div>
  );
}

export default Profile;
