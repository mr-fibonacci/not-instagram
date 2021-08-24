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
    id,
    content,
    posts_count,
    followers_count,
    following_count,
    following_id,
    image,
    name,
    owner,
    setProfilesMethods,
    imageSize = 50,
    profilePage,
    stats = true,
  } = props;
  const history = useHistory();
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const handleEdit = () => history.push(`/profiles/${id}/edit`);
  const handleAddPost = () => history.push("/posts/create");
  const handleFollow = async () => {
    try {
      const { data } = await axios.post("/followers/", { followed: id });
      setProfilesMethods.forEach((setProfilesMethod) => {
        setProfilesMethod((prevProfiles) => ({
          ...prevProfiles,
          results: prevProfiles.results.map((profile) => {
            const is_owner = currentUser?.username === profile.owner;
            return profile.id === id
              ? {
                  ...profile,
                  followers_count: profile.followers_count + 1,
                  following_id: data.id,
                }
              : is_owner
              ? { ...profile, following_count: profile.following_count + 1 }
              : profile;
          }),
        }));
      });
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleUnfollow = async () => {
    try {
      await axios.delete(`/followers/${following_id}/`);
      setProfilesMethods.forEach((setProfilesMethod) => {
        setProfilesMethod((prevProfiles) => ({
          ...prevProfiles,
          results: prevProfiles.results.map((profile) => {
            const is_owner = currentUser?.username === profile.owner;
            return profile.id === id
              ? {
                  ...profile,
                  followers_count: profile.followers_count - 1,
                  following_id: null,
                }
              : is_owner
              ? { ...profile, following_count: profile.following_count - 1 }
              : profile;
          }),
        }));
      });
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <>
      <Media className="d-flex flex-wrap">
        <Link to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
        <Media.Body>
          <h5>{owner}</h5>
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
                  onClick={handleUnfollow}
                >
                  unfollow
                </Button>
              ) : (
                !is_owner && (
                  <Button
                    className={`${styles.Button} ${styles.Black}`}
                    onClick={handleFollow}
                  >
                    follow
                  </Button>
                )
              ))}
          </>
        )}
      </Media>
    </>
  );
}

export default Profile;
