import React, { useState, useEffect } from "react";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Profile(props) {
  const {
    id,
    owner,
    is_owner,
    followers,
    following,
    following_id,
    content,
    image,
  } = props;
  const { history } = props;
  const [toggleFollowingId, setToggleFollowingId] = useState(following_id);
  const [toggleFollowers, setToggleFollowers] = useState(followers);

  useEffect(() => {
    setToggleFollowers(followers);
  }, [followers]);

  const handleFollow = async () => {
    try {
      const { data } = await axios.post("/followers/", { followed: id });
      setToggleFollowingId(data.id);
      setToggleFollowers((prevCount) => prevCount + 1);
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleUnfollow = async () => {
    try {
      await axios.delete(`/followers/${toggleFollowingId}/`);
      setToggleFollowingId(null);
      setToggleFollowers((prevCount) => prevCount - 1);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <>
      <Media>
        <img width="100px" className="align-self-center" src={image} />
        <Media.Body>
          <h5>profile owner: {owner}</h5>
          <h5>description: {content}</h5>
          <h5>followers: {toggleFollowers}</h5>
          <h5>following: {following}</h5>
        </Media.Body>
      </Media>
      {toggleFollowingId ? (
        <Button onClick={handleUnfollow}>unfollow</Button>
      ) : (
        <Button onClick={handleFollow}>follow</Button>
      )}
      {is_owner ? (
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
