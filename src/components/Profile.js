import React from "react";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Profile(props) {
  const {
    id,
    content,
    posts,
    followers,
    following,
    following_id,
    image,
    is_owner,
    name,
    owner,
    setProfilesMethods,
  } = props;
  const history = useHistory();
  const handleFollow = async () => {
    try {
      const { data } = await axios.post("/followers/", { followed: id });
      setProfilesMethods.forEach((setProfilesMethod) => {
        setProfilesMethod((prevProfiles) =>
          prevProfiles.map((profile) => {
            return profile.id === id
              ? {
                  ...profile,
                  followers: profile.followers + 1,
                  following_id: data.id,
                }
              // : profile;
              : profile.is_owner ? {...profile, following: profile.following + 1} : profile;
          })
        );
      });
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleUnfollow = async () => {
    try {
      await axios.delete(`/followers/${following_id}/`);
      setProfilesMethods.forEach((setProfilesMethod) => {
        setProfilesMethod((prevProfiles) =>
          prevProfiles.map((profile) => {
            return profile.id === id
              ? {
                  ...profile,
                  followers: profile.followers - 1,
                  following_id: null,
                }
              // : profile;
              : profile.is_owner ? {...profile, following: profile.following - 1} : profile;
          })
        );
      });
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <>
      <Media>
        <Link to={`/profiles/${id}`}>
          <img width="100px" className="align-self-center" src={image} />
          {`${owner} posts: ${posts} followers: ${followers} following: ${following}`}
        </Link>
        <Media.Body></Media.Body>
      </Media>

      {is_owner ? <>
          <Button onClick={() => history.push(`/profiles/${id}/edit`)}>
            edit
          </Button>
          <Button onClick={() => history.push("/posts/create")}>
            add a post
          </Button>
        </> : (
        <>
          {following_id ? (
            <Button onClick={handleUnfollow}>unfollow</Button>
          ) : (
            <Button onClick={handleFollow}>follow</Button>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
