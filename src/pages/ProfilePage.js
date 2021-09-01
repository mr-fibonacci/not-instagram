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
import PopularProfiles from "../components/PopularProfiles";
import { ReactComponent as NoResults } from "../assets/no-results.svg";
import { useCurrentUser } from "../CurrentUserContext";
import { Image, Button } from "react-bootstrap";
import MoreDropdown from "../components/MoreDropdown";
import btnStyles from "../components/Button.module.css";
import styles from "../App.module.css";
import { Link, useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

function ProfilePage() {
  const { id } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profile, setProfile] = useState({ results: [] });
  const [profilePosts, setProfilePosts] = useState({
    results: [],
  });
  const [followingProfiles, setFollowingProfiles] = useState({
    results: [],
  });
  const [followedProfiles, setFollowedProfiles] = useState({
    results: [],
  });
  const [popularProfiles, setPopularProfiles] = useState({
    results: [],
  });
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const currentUser = useCurrentUser();
  const history = useHistory();
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
        setCurrentUserProfile(currentUserProfile);
      }
      setProfile({ results: [profile] });
      setProfilePosts(profilePosts);
      setFollowingProfiles(followingProfiles);
      setFollowedProfiles(followedProfiles);
      setPopularProfiles(popularProfiles);
      setHasLoaded(true);
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
    try {
      const { data } = await axios.post("/followers/", {
        followed: clickedProfile.id,
      });
      if (profile.results[0]?.id === clickedProfile.id) {
        setFollowedProfiles((prevState) => ({
          ...prevState,
          results: [currentUserProfile, ...prevState.results],
        }));
      }
      if (profile.results[0]?.id === currentUserProfile.id) {
        setFollowingProfiles((prevState) => ({
          ...prevState,
          results: [clickedProfile, ...prevState.results],
        }));
      }
      [
        setProfile,
        setFollowingProfiles,
        setFollowedProfiles,
        setPopularProfiles,
      ].forEach((setProfilesMethod) => {
        setProfilesMethod((prevProfiles) => ({
          ...prevProfiles,
          results: prevProfiles.results.map((profile) => {
            // const is_owner = currentUser?.username === profile.owner;
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
      });
    } catch (err) {
      console.log(err.request);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axios.delete(`/followers/${clickedProfile.following_id}/`);
      if (profile.results[0]?.id === clickedProfile.id) {
        setFollowedProfiles((prevState) => ({
          ...prevState,
          results: prevState.results.filter(
            (profile) => profile.id !== currentUserProfile.id
          ),
        }));
      }
      if (profile.results[0]?.id === currentUserProfile.id) {
        setFollowingProfiles((prevState) => ({
          ...prevState,
          results: prevState.results.filter(
            (profile) => profile.id !== clickedProfile.id
          ),
        }));
      }
      [
        setProfile,
        setFollowingProfiles,
        setFollowedProfiles,
        setPopularProfiles,
      ].forEach((setProfilesMethod) => {
        setProfilesMethod((prevProfiles) => ({
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
      });
    } catch (err) {
      console.log(err.request);
    }
  };

  return (
    <Row>
      <Col className="p-0 p-md-2" md={8}>
        <Container
          className={`${appStyles.Content} d-block d-md-none text-center mb-3`}
        >
          <div className="my-1">you may also like...</div>
          <Swiper slidesPerView={4}>
            {popularProfiles.results.map((profile) => (
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
              {profile.results[0].is_owner && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleAdd={handleAddPost}
                />
              )}
              <div className="d-flex flex-column flex-lg-row align-items-center justify-content-lg-center text-center">
                <div>
                  <Image
                    roundedCircle
                    style={{
                      objectFit: "cover",
                      height: "200px",
                      width: "200px",
                      margin: "4px",
                    }}
                    src={profile.results[0].image}
                  />
                </div>
                <div className="d-flex flex-column align-items-center m-1">
                  <h3 className="m-2">{profile.results[0].owner}</h3>
                  <div>{profile.results[0].content}</div>
                  <div className="d-flex text-center">
                    <div className="m-2">
                      <div>{profile.results[0].posts_count}</div>
                      <div>posts</div>
                    </div>
                    <div className="m-2">
                      <div>{profile.results[0].followers_count}</div>
                      <div>followers</div>
                    </div>
                    <div className="m-2">
                      <div>{profile.results[0].following_count}</div>
                      <div>following</div>
                    </div>
                  </div>
                </div>
                {!profile.results[0].is_owner && (
                  <>
                    {currentUser &&
                      (profile.results[0].following_id ? (
                        <Button
                          className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                          onClick={() => handleUnfollow(profile.results[0])}
                        >
                          unfollow
                        </Button>
                      ) : (
                        !profile.results[0].is_owner && (
                          <Button
                            className={`${btnStyles.Button} ${btnStyles.Black}`}
                            onClick={() => handleFollow(profile.results[0])}
                          >
                            follow
                          </Button>
                        )
                      ))}
                  </>
                )}
              </div>
              {/* <div className="d-block d-md-none text-center">
                <hr />
                suggestions for you
                <hr />
                <Swiper
                  slidesPerView={3}
                >
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
                <Tab eventKey="posts" title="posts">
                  <InfiniteScroll
                    dataLength={profilePosts.results.length}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                    hasMore={!!profilePosts.next}
                    loader={<Asset children={<Spinner animation="border" />} />}
                  >
                    {profilePosts.results.length ? (
                      profilePosts.results.map((post) => (
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
                </Tab>
                <Tab eventKey="followers" title="followers">
                  <InfiniteScroll
                    dataLength={followedProfiles.results.length}
                    next={() =>
                      fetchMoreData(followedProfiles, setFollowedProfiles)
                    }
                    hasMore={!!followedProfiles.next}
                    loader={<Asset children={<Spinner animation="border" />} />}
                  >
                    {followedProfiles.results.length ? (
                      followedProfiles.results.map((profile) => (
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
                  </InfiniteScroll>
                </Tab>
                <Tab eventKey="following" title="following">
                  <InfiniteScroll
                    dataLength={followingProfiles.results.length}
                    next={() =>
                      fetchMoreData(followingProfiles, setFollowingProfiles)
                    }
                    hasMore={!!followingProfiles.next}
                    loader={<Asset children={<Spinner animation="border" />} />}
                  >
                    {followingProfiles.results.length ? (
                      followingProfiles.results.map((profile) => (
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
                  </InfiniteScroll>
                </Tab>
              </Tabs>
            </>
          ) : (
            <Asset children={<Spinner animation="border" />} />
          )}
        </Container>
      </Col>
      <Col md={4} className="d-none d-md-block p-0 p-md-2">
        <Container className={styles.Content}>
          <p>you may also like...</p>
          {popularProfiles.results.map((profile) => (
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
