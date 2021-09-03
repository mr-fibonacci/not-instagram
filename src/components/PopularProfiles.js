import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Profile from "./Profile";
import styles from "../App.module.css";
import { refreshToken } from "../utils";

const PopularProfiles = () => {
  const [popularProfiles, setPopularProfiles] = useState({ results: [] });
  useEffect(() => {
    handleMount();
  }, []);
  const handleMount = async () => {
    // refreshToken
    await refreshToken();
    try {
      const { data } = await axios.get("/profiles/?ordering=-followers_count");
      setPopularProfiles(data);
      console.log("data", data);
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axios.post("/followers/", {
        followed: clickedProfile.id,
      });
      setPopularProfiles((prevProfiles) => ({
        ...prevProfiles,
        results: prevProfiles.results.map((profile) => {
          return profile.id === clickedProfile.id
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
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleUnfollow = async (clickedProfile) => {
    try {
      await axios.delete(`/followers/${clickedProfile.following_id}/`);
      setPopularProfiles((prevProfiles) => ({
        ...prevProfiles,
        results: prevProfiles.results.map((profile) => {
          // const is_owner = currentUser?.username === profile.owner;
          return profile.id === clickedProfile.id
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
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <Container className={styles.Content}>
      <p>Most followed profiles.</p>
      {popularProfiles.results?.map((profile) => (
        <Profile
          key={profile.id}
          profile={profile}
          stats={false}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
        />
      ))}
    </Container>
  );
};

export default PopularProfiles;
