import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import InfiniteScroll from "react-infinite-scroll-component";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import Asset from "../../components/Asset";
import Post from "../Posts/Post";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData, followHelper, unfollowHelper } from "../../utils/utils";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

import "../../styles/ProfilePage.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import NoResults from "../../assets/no-results.png";
import PopularProfiles from "./PopularProfiles";

function ProfilePage() {
  const { id } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentUser = useCurrentUser();

  const [profileState, setProfileState] = useState({
    profile: null,
    popularProfiles: { results: [] },
  });
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const { profile, popularProfiles } = profileState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: profile },
          { data: profilePosts },
          { data: popularProfiles },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
          axiosReq.get("/profiles/?ordering=-followers_count"),
        ]);
        setProfileState((prevState) => ({
          ...prevState,
          profile,
          popularProfiles,
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileState((prevState) => ({
        ...prevState,
        profile: followHelper(profile, clickedProfile, data.id),
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setProfileState((prevState) => {
        return {
          ...prevState,
          profile: unfollowHelper(profile, clickedProfile),
          popularProfiles: {
            ...prevState.popularProfiles,
            results: prevState.popularProfiles.results.map((profile) =>
              unfollowHelper(profile, clickedProfile)
            ),
          },
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3">
        <Col lg={3} className="text-center text-lg-left">
          <Image className="ProfileImage" roundedCircle src={profile?.image} />
        </Col>
        <Col lg={6} className="text-center">
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="text-center justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-center text-lg-right">
          {!profile?.is_owner && (
            <>
              {currentUser &&
                (profile?.following_id ? (
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                    onClick={() => handleUnfollow(profile)}
                  >
                    unfollow
                  </Button>
                ) : (
                  !profile?.is_owner && (
                    <Button
                      className={`${btnStyles.Button} ${btnStyles.Black}`}
                      onClick={() => handleFollow(profile)}
                    >
                      follow
                    </Button>
                  )
                ))}
            </>
          )}
        </Col>
        {profile?.content && (
          <Col className="text-center p-3">{profile.content}</Col>
        )}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      <InfiniteScroll
        dataLength={profilePosts?.results.length}
        next={() => fetchMoreData(profilePosts, setProfilePosts)}
        hasMore={!!profilePosts.next}
        loader={<Asset spinner />}
      >
        {profilePosts?.results.length ? (
          profilePosts?.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))
        ) : (
          <Asset
            src={NoResults}
            message={`No results found, ${profile?.owner} hasn't posted yet.`}
          />
        )}
      </InfiniteScroll>
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles
          mobile
          profiles={popularProfiles}
          follow={handleFollow}
          unfollow={handleUnfollow}
        />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles
          profiles={popularProfiles}
          follow={handleFollow}
          unfollow={handleUnfollow}
        />
      </Col>
    </Row>
  );
}

export default ProfilePage;
