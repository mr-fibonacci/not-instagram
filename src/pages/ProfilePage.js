import axios from "axios";
import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useParams } from "react-router";
import Post from "../components/Post";
import Profile from "../components/Profile";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData, refreshToken } from "../utils";
import "./ProfilePage.css";
import Asset from "../components/Asset";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../App.module.css";
import { ReactComponent as NoResults } from "../assets/no-results.svg";
import { useCurrentUser } from "../CurrentUserContext";
import { Image, Button } from "react-bootstrap";
import MoreDropdown from "../components/MoreDropdown";
import btnStyles from "../components/Button.module.css";
import styles from "../App.module.css";
import { Link, useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

function ProfilePage() {
  console.log("render");

  const history = useHistory();
  const { id } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentUser = useCurrentUser();

  const [state, setState] = useState({
    profile: null,
    currentUserProfile: null,
    followingProfiles: { results: [] },
    followedProfiles: { results: [] },
    popularProfiles: { results: [] },
    profilePosts: { results: [] },
  });
  const {
    profile,
    currentUserProfile,
    followingProfiles,
    followedProfiles,
    popularProfiles,
    profilePosts,
  } = state;

  const fetchData = async () => {
    // refreshToken
    await refreshToken();
    try {
      const [
        { data: profile },
        { data: profilePosts },
        { data: followingProfiles },
        { data: followedProfiles },
        { data: popularProfiles },
      ] = await Promise.all([
        axios.get(`/profiles/${id}/`),
        axios.get(`/posts/?owner__profile=${id}`),
        axios.get(`/profiles/?owner__followed__owner__profile=${id}`),
        axios.get(`/profiles/?owner__following__followed__profile=${id}`),
        axios.get("/profiles/?ordering=-followers_count"),
      ]);
      if (currentUser) {
        const { data: currentUserProfile } = await axios.get(
          `/profiles/${currentUser.profile_id}/`
        );
        setState((prevState) => ({
          ...prevState,
          currentUserProfile,
        }));
      }
      setHasLoaded(true);
      setState((prevState) => ({
        ...prevState,
        profile,
        profilePosts,
        followingProfiles,
        followedProfiles,
        popularProfiles,
      }));
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleEdit = () => history.push(`/profiles/${id}/edit`);
  const handleAddPost = () => history.push("/posts/create");
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleFollow = async (clickedProfile) => {
    const followHelper = (profile, clickedProfile, following_id) => {
      return profile.id === clickedProfile.id
        ? {
            ...profile,
            followers_count: profile.followers_count + 1,
            following_id,
          }
        : profile.is_owner
        ? { ...profile, following_count: profile.following_count + 1 }
        : profile;
    };
    try {
      const { data } = await axios.post("/followers/", {
        followed: clickedProfile.id,
      });
      if (profile?.id === clickedProfile.id) {
        setState((prevState) => ({
          ...prevState,
          followedProfiles: {
            ...prevState.followedProfiles,
            results: [
              currentUserProfile,
              ...prevState.followedProfiles.results,
            ],
          },
        }));
      }
      if (profile?.id === currentUserProfile?.id) {
        setState((prevState) => ({
          ...prevState,
          followingProfiles: {
            ...prevState.followingProfiles,
            results: [clickedProfile, ...prevState.followingProfiles.results],
          },
        }));
      }
      setState((prevState) => ({
        ...prevState,
        profile: followHelper(profile, clickedProfile, data.id),
        currentUserProfile: followHelper(
          prevState.currentUserProfile,
          clickedProfile,
          data.id
        ),
        followingProfiles: {
          ...prevState.followingProfiles,
          results: prevState.followingProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        followedProfiles: {
          ...prevState.followedProfiles,
          results: prevState.followedProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err.request);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    const unfollowHelper = (profile, clickedProfile) => {
      return profile.id === clickedProfile.id
        ? {
            ...profile,
            followers_count: profile.followers_count - 1,
            following_id: null,
          }
        : profile.is_owner
        ? { ...profile, following_count: profile.following_count - 1 }
        : profile;
    };
    try {
      await axios.delete(`/followers/${clickedProfile.following_id}/`);
      if (profile?.id === clickedProfile.id) {
        setState((prevState) => ({
          ...prevState,
          followedProfiles: {
            ...prevState.followedProfiles,
            results: prevState.followedProfiles.results.filter(
              (profile) => profile.id !== currentUserProfile?.id
            ),
          },
        }));
      }
      if (profile?.id === currentUserProfile?.id) {
        setState((prevState) => ({
          ...prevState,
          followingProfiles: {
            ...prevState.followingProfiles,
            results: prevState.followingProfiles.results.filter(
              (profile) => profile.id !== clickedProfile.id
            ),
          },
        }));
      }
      setState((prevState) => {
        return {
          ...prevState,
          profile: unfollowHelper(profile, clickedProfile),
          currentUserProfile: unfollowHelper(
            prevState.currentUserProfile,
            clickedProfile
          ),
          followingProfiles: {
            ...prevState.followingProfiles,
            results: prevState.followingProfiles.results.map((profile) =>
              unfollowHelper(profile, clickedProfile)
            ),
          },
          followedProfiles: {
            ...prevState,
            results: prevState.followedProfiles.results.map((profile) =>
              unfollowHelper(profile, clickedProfile)
            ),
          },
          popularProfiles: {
            ...prevState.popularProfiles,
            results: prevState.popularProfiles.results.map((profile) =>
              unfollowHelper(profile, clickedProfile)
            ),
          },
        };
      });
    } catch (err) {
      console.log(err.request);
    }
  };

  return (
    <Row>
      <Col className="p-0 p-lg-2" lg={8}>
        <Container
          className={`${appStyles.Content} d-block d-lg-none text-center mb-3`}
        >
          <div className="my-1">Most followed profiles.</div>
          <Swiper slidesPerView={4}>
            {popularProfiles?.results?.map((profile) => (
              <SwiperSlide key={profile.id}>
                <Link to={`/profiles/${profile.id}`}>
                  <div className="d-flex flex-column align-items-center">
                    <Image
                      roundedCircle
                      style={{
                        width: "64px",
                        height: "64px",
                        objectFit: "cover",
                      }}
                      src={profile.image}
                    />
                    {profile.owner}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {profile?.is_owner && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleAdd={handleAddPost}
                />
              )}

              <Row>
                <Col lg={3} className="text-center text-lg-left">
                  <Image
                    className="ProfileImage"
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
              {/* <div className="d-block d-md-none text-center">
                <hr />
                suggestions for you
                <hr />
                <Swiper slidesPerView={3}>
                  {popularProfiles.results.map((profile) => (
                    <SwiperSlide key={profile.id}>
                      <Link to={`/profiles/${profile.id}`}>
                        <div className="d-flex flex-column align-items-center">
                          <Image
                            roundedCircle
                            style={{
                              width: "90px",
                              height: "90px",
                              objectFit: "cover",
                            }}
                            src={profile.image}
                          />
                          {profile.owner}
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div> */}
              <hr />
              <Tabs variant="pills">
                {/* <Tab eventKey="posts" title="posts">
                  <InfiniteScroll
                    dataLength={profilePosts?.results.length}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                    hasMore={!!profilePosts.next}
                    loader={<Asset children={<Spinner animation="border" />} />}
                  >
                    {profilePosts?.results.length ? (
                      profilePosts?.results.map((post) => (
                        <Post
                          key={post.id}
                          {...post}
                          setPosts={setProfilePosts}
                        />
                      ))
                    ) : (
                      <Asset children={<NoResults />} />
                    )}
                  </InfiniteScroll>
                </Tab> */}
                <Tab eventKey="followers" title="followers">
                  <InfiniteScroll
                    dataLength={followedProfiles?.results.length}
                    // next={() =>
                    //   fetchMoreData(followedProfiles, setFollowedProfiles)
                    // }
                    hasMore={!!followedProfiles.next}
                    loader={<Asset children={<Spinner animation="border" />} />}
                  >
                    <Container fluid>
                      {followedProfiles?.results.length ? (
                        followedProfiles?.results.map((profile) => (
                          <Profile
                            key={profile.id}
                            profile={profile}
                            handleFollow={handleFollow}
                            handleUnfollow={handleUnfollow}
                          />
                        ))
                      ) : (
                        <Asset children={<NoResults />} />
                      )}
                    </Container>
                  </InfiniteScroll>
                </Tab>
                <Tab eventKey="following" title="following">
                  <InfiniteScroll
                    dataLength={followingProfiles?.results.length}
                    // next={() =>
                    //   fetchMoreData(followingProfiles, setFollowingProfiles)
                    // }
                    hasMore={!!followingProfiles.next}
                    loader={<Asset children={<Spinner animation="border" />} />}
                  >
                    <Container fluid>
                      {followingProfiles?.results.length ? (
                        followingProfiles?.results.map((profile) => (
                          <Profile
                            key={profile.id}
                            profile={profile}
                            handleFollow={handleFollow}
                            handleUnfollow={handleUnfollow}
                          />
                        ))
                      ) : (
                        <Asset children={<NoResults />} />
                      )}
                    </Container>
                  </InfiniteScroll>
                </Tab>
              </Tabs>
            </>
          ) : (
            <Asset children={<Spinner animation="border" />} />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <Container className={styles.Content}>
          <p>Most followed profiles.</p>
          {popularProfiles?.results?.map((profile) => (
            <Profile
              key={profile.id}
              profile={profile}
              stats={false}
              handleFollow={handleFollow}
              handleUnfollow={handleUnfollow}
            />
          ))}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;
