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
import { fetchMoreData } from "../../utils/utils";
import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import NoResults from "../../assets/no-results.png";
import PopularProfiles from "./PopularProfiles";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";

function ProfilePage() {
  const { id } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentUser = useCurrentUser();

  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3">
        <Col lg={3} className="text-center text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
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
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts?.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts?.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
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
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
