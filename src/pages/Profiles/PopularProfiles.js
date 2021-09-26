import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Profile from "./Profile";

import Asset from "../../components/Asset";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";

const PopularProfiles = ({ mobile, profiles, follow, unfollow }) => {
  const [popularProfiles, setPopularProfiles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    handleMount();
  }, []);

  const handleMount = async () => {
    try {
      const { data } = await axiosReq.get(
        "/profiles/?ordering=-followers_count"
      );
      setPopularProfiles(data);
      setHasLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
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
      console.log(err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      setPopularProfiles((prevProfiles) => ({
        ...prevProfiles,
        results: prevProfiles.results.map((profile) => {
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
      console.log(err);
    }
  };

  const array = profiles ? profiles : popularProfiles;

  return mobile ? (
    <Container
      className={`${appStyles.Content} d-block d-lg-none text-center mb-3`}
    >
      {!hasLoaded ? (
        <Asset spinner />
      ) : (
        <>
          <div className="my-1">Most followed profiles.</div>{" "}
          <div className={`d-flex ${mobile ? "justify-content-around" : ""}`}>
            {array?.results?.slice(0, 4).map((profile) => (
              <Profile
                key={profile.id}
                profile={profile}
                stats={false}
                handleFollow={follow ? follow : handleFollow}
                handleUnfollow={unfollow ? unfollow : handleUnfollow}
                mobile={mobile}
              />
            ))}
          </div>
        </>
      )}
    </Container>
  ) : (
    <Container className={appStyles.Content}>
      {!hasLoaded ? (
        <Asset spinner />
      ) : (
        <>
          <p>Most followed profiles.</p>
          {array?.results?.map((profile) => (
            <Profile
              key={profile.id}
              profile={profile}
              stats={false}
              handleFollow={follow ? follow : handleFollow}
              handleUnfollow={unfollow ? unfollow : handleUnfollow}
            />
          ))}
        </>
      )}
    </Container>
  );
};

export default PopularProfiles;
