import React from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Avatar from "../../components/Avatar";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Profile.module.css";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

function Profile(props) {
  const { profile, imageSize = 55, mobile } = props;

  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${
        mobile ? "flex-column" : ""
      }`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <div>
          <b>{owner}</b>
        </div>
      </div>
      <div className={`${!mobile && "ml-auto"} text-right`}>
        {/* ml-auto only on desktop */}
        {
          // !mobile && // show or hide the follow button for mobile
          currentUser &&
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
            ))
        }
      </div>
    </div>
  );
}

export default Profile;
