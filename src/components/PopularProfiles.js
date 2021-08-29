import axios from "axios";
import React from "react";
import Container from "react-bootstrap/Container";
import Profile from "./Profile";
import styles from "../App.module.css";
import { usePopularProfilesContext } from "../PopularProfilesContext";

const PopularProfiles = ({ handleFollow, handleUnfollow }) => {
  const popularProfiles = usePopularProfilesContext();
  console.log("popular profiles", popularProfiles);
  return (
    <Container className={styles.Content}>
      <p> you may also like...</p>
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
