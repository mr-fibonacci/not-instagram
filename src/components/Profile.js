import React from "react";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../CurrentUserContext";
import Avatar from "./Avatar";
import MoreDropdown from "./MoreDropdown";
import styles from "./Button.module.css";

function Profile(props) {
  const {
    profile,
    handleFollow,
    handleUnfollow,
    imageSize = 50,
    profilePage,
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
  const handleEdit = () => history.push(`/profiles/${id}/edit`);
  const handleAddPost = () => history.push("/posts/create");
  return (
    <div className="d-flex my-2  text-center flex-wrap justify-content-center">
      <Link className="align-self-center " to={`/profiles/${id}`}>
        <Avatar src={image} height={imageSize} />
      </Link>
      <div
        className="d-flex flex-column  flex-fill justify-content-center"
        // style={{ minWidth: "150px" }}
      >
        <div className="">{owner}</div>
        {stats && (
          <div className=" d-none d-sm-block">
            posts: {posts_count} followers: {followers_count} following:{" "}
            {following_count}
          </div>
        )}
      </div>
      <div
        className=" d-flex align-items-center justify-content-center"
        style={{ minWidth: "90px" }}
      >
        {is_owner && profilePage ? (
          <MoreDropdown handleEdit={handleEdit} handleAdd={handleAddPost} />
        ) : (
          <div>
            {currentUser &&
              (following_id ? (
                <Button
                  className={`${styles.Button} ${styles.BlackOutline}`}
                  onClick={() => handleUnfollow(profile)}
                >
                  unfollow
                </Button>
              ) : (
                !is_owner && (
                  <Button
                    className={`${styles.Button} ${styles.Black}`}
                    onClick={() => handleFollow(profile)}
                  >
                    follow
                  </Button>
                )
              ))}
          </div>
        )}
      </div>
      {/* <Media className="d-flex flex-wrap my-2">
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
        <Media.Body className="d-flex justify-content-around">
          <h5 className="align-self-center">{owner}</h5>
          {stats && (
            <div className="d-flex text-center">
              <div className="m-2">
                <div>{posts_count}</div>
                <div>posts</div>
              </div>
              <div className="m-2">
                <div>{followers_count}</div>
                <div>followers</div>
              </div>
              <div className="m-2">
                <div>{following_count}</div>
                <div>following</div>
              </div>
            </div>
          )}
        </Media.Body>
        {is_owner && profilePage ? (
          <MoreDropdown handleEdit={handleEdit} handleAdd={handleAddPost} />
        ) : (
          <>
            {currentUser &&
              (following_id ? (
                <Button
                  className={`${styles.Button} ${styles.BlackOutline}`}
                  onClick={() => handleUnfollow(profile)}
                >
                  unfollow
                </Button>
              ) : (
                !is_owner && (
                  <Button
                    className={`${styles.Button} ${styles.Black}`}
                    onClick={() => handleFollow(profile)}
                  >
                    follow
                  </Button>
                )
              ))}
          </>
        )}
      </Media> */}
    </div>
  );
}

export default Profile;
