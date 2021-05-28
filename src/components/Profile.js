import React, { useState, useEffect } from "react";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory, useParams } from "react-router";

function Profile(props) {
  const { profile } = props;
  const { id } = useParams();
  const history = useHistory();

  const handleFollow = async () => {
    try {
      const { data } = await axios.post("/followers/", { followed: id });
      // setToggleFollowingId(data.id);
      // setToggleFollowers((prevCount) => prevCount + 1);
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleUnfollow = async () => {
    try {
      await axios.delete(`/followers/${profile?.following_id}/`);
      // setToggleFollowingId(null);
      // setToggleFollowers((prevCount) => prevCount - 1);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <>
      <Media>
        <img width="100px" className="align-self-center" src={profile?.image} />
        <Media.Body>
          <h5>profile owner: {profile?.owner}</h5>
          <h5>description: {profile?.content}</h5>
          <h5>followers: {profile?.followers}</h5>
          <h5>following: {profile?.following}</h5>
        </Media.Body>
      </Media>
      {profile?.following_id ? (
        <Button onClick={() => console.log("handleUnfollow")}>unfollow</Button>
      ) : (
        <Button onClick={() => console.log("handleFollow")}>follow</Button>
      )}
      {profile?.is_owner ? (
        <>
          <Button onClick={() => history.push(`/profiles/${id}/edit`)}>
            edit
          </Button>
          <Button onClick={() => history.push("/posts/create")}>
            add a post
          </Button>
        </>
      ) : null}
    </>
  );
}

export default Profile;
