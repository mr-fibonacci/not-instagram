import React from "react";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import Avatar from "./Avatar";

function Profile(props) {
  const {
    id,
    content,
    posts_count,
    followers_count,
    following_count,
    following_id,
    image,
    is_owner,
    name,
    owner,
    setProfilesMethods,
    imageSize = 80,
  } = props;
  const history = useHistory();
  const handleFollow = async () => {
    try {
      const { data } = await axios.post("/followers/", { followed: id });
      setProfilesMethods.forEach((setProfilesMethod) => {
        setProfilesMethod((prevProfiles) => ({
          ...prevProfiles,
          results: prevProfiles.results.map((profile) => {
            return profile.id === id
              ? {
                  ...profile,
                  followers_count: profile.followers_count + 1,
                  following_id: data.id,
                }
              : profile.is_owner
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
            return profile.id === id
              ? {
                  ...profile,
                  followers_count: profile.followers_count - 1,
                  following_id: null,
                }
              : profile.is_owner
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
      <Media>
        <Link to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
          {`${owner} posts: ${posts_count} followers: ${followers_count} following: ${following_count}`}
        </Link>
        <Media.Body>
          {is_owner ? (
            <>
              <Button onClick={() => history.push(`/profiles/${id}/edit`)}>
                edit
              </Button>
              <Button onClick={() => history.push("/posts/create")}>
                add a post
              </Button>
            </>
          ) : (
            <>
              {following_id ? (
                <Button onClick={handleUnfollow}>unfollow</Button>
              ) : (
                <Button onClick={handleFollow}>follow</Button>
              )}
            </>
          )}
        </Media.Body>
      </Media>
    </>
  );
}

export default Profile;
