import axios from "axios";
import React, { useEffect, useState } from "react";
import { refreshToken } from "../utils";
import Content from "./Content";
import Profile from "./Profile";

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
    <Content>
      <p> you may also like...</p>
      {profiles.map((profile) => (
        <Profile key={profile.id} {...profile} stats={false} />
      ))}
    </Content>
  );
};

export default PopularProfiles;
