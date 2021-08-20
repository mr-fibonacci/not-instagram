import axios from "axios";
import React, { useEffect, useState } from "react";
import Content from "./Content";
import Profile from "./Profile";

const PopularProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    handleMount();
  }, []);
  const handleMount = async () => {
    try {
      const { data } = await axios.get("/profiles/");
      setProfiles(data.results);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <Content>
      <p> you may also like...</p>
      {profiles.map((profile) => (
        <Profile key={profile.id} {...profile} />
      ))}
    </Content>
  );
};

export default PopularProfiles;
