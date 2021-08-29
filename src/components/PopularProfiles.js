import axios from "axios";
import React from "react";
import Container from "react-bootstrap/Container";
import Profile from "./Profile";
import styles from "../App.module.css";
import {
  usePopularProfilesContext,
  useSetPopularProfilesContext,
} from "../PopularProfilesContext";

const PopularProfiles = ({ handleFollow, handleUnfollow }) => {
  const popularProfiles = usePopularProfilesContext();
  const setPopularProfilesContext = useSetPopularProfilesContext();
  console.log("popular profiles", popularProfiles);

  const follow = async (clickedProfile) => {
    try {
      const { data } = await axios.post("/followers/", {
        followed: clickedProfile.id,
      });
      setPopularProfilesContext((prevProfiles) => ({
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
  const unfollow = async (clickedProfile) => {
    try {
      await axios.delete(`/followers/${clickedProfile.following_id}/`);
      setPopularProfilesContext((prevProfiles) => ({
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
      <p> you may also like...</p>
      {popularProfiles.results?.map((profile) => (
        <Profile
          key={profile.id}
          profile={profile}
          stats={false}
          handleFollow={handleFollow || follow}
          handleUnfollow={handleUnfollow || unfollow}
        />
      ))}
    </Container>
  );
};

export default PopularProfiles;
