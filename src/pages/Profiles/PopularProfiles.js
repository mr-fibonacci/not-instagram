import React from "react";

import Container from "react-bootstrap/Container";
import Profile from "./Profile";

import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import { useProfileData } from "../../contexts/ProfileDataContext";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return mobile ? (
    <Container
      className={`${appStyles.Content} d-block d-lg-none text-center mb-3`}
    >
      {!popularProfiles.results.length ? (
        <Asset spinner />
      ) : (
        <>
          <div className="my-1">Most followed profiles.</div>
          <div className="d-flex justify-content-around">
            {popularProfiles?.results?.slice(0, 4).map((profile) => (
              <Profile key={profile.id} profile={profile} mobile={mobile} />
            ))}
          </div>
        </>
      )}
    </Container>
  ) : (
    <Container className={appStyles.Content}>
      {!popularProfiles.results.length ? (
        <Asset spinner />
      ) : (
        <>
          <p>Most followed profiles.</p>
          {popularProfiles?.results?.map((profile) => (
            <Profile key={profile.id} profile={profile} />
          ))}
        </>
      )}
    </Container>
  );
};

export default PopularProfiles;
