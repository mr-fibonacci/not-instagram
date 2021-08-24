import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { refreshToken } from "../utils";
import Profile from "./Profile";
import styles from "../App.module.css";

const PopularProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    handleMount();
  }, []);
  const handleMount = async () => {
    // refreshToken
    await refreshToken();
    try {
      const { data } = await axios.get("/profiles?ordering=-followers_count");
      setProfiles(data.results);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <Container className={styles.Content}>
      <p> you may also like...</p>
      {profiles.map((profile) => (
        <Profile key={profile.id} {...profile} stats={false} />
      ))}
    </Container>
  );
};

export default PopularProfiles;
