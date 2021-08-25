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

  const fetchData = async () => {
    // refreshToken
    await refreshToken();
    try {
      const [
        { data: profile },
        { data: profilePosts },
        { data: followingProfiles },
        { data: followedProfiles },
      ] = await Promise.all([
        axios.get(`/profiles/${id}/`),
        axios.get(`/posts/?owner__profile=${id}`),
        axios.get(`/profiles/?owner__followed__owner__profile=${id}`),
        axios.get(`/profiles/?owner__following__followed__profile=${id}`),
      ]);
      setProfile({ results: [profile] });
      setProfilePosts(profilePosts);
      setFollowingProfiles(followingProfiles);
      setFollowedProfiles(followedProfiles);
      setHasLoaded(true);
    } catch (err) {
      console.log(err.request);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Row>
      <Col className="p-0 p-md-2" md={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              <Profile
                {...profile.results[0]}
                setProfilesMethods={[
                  setProfile,
                  setFollowedProfiles,
                  setFollowingProfiles,
                ]}
                imageSize={120}
                profilePage
              />
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
                    children={followedProfiles.results.map((profile) => (
                      <Profile
                        key={profile.id}
                        {...profile}
                        setProfilesMethods={[
                          setProfile,
                          setFollowedProfiles,
                          setFollowingProfiles,
                        ]}
                      />
                    ))}
                  />
                </Tab>
                <Tab eventKey="following" title="following">
                  <InfiniteScroll
                    dataLength={followingProfiles.results.length}
                    next={() =>
                      fetchMoreData(followingProfiles, setFollowingProfiles)
                    }
                    hasMore={!!followingProfiles.next}
                    loader={<Asset children={<Spinner animation="border" />} />}
                    children={followingProfiles.results.map((profile) => (
                      <Profile
                        key={profile.id}
                        {...profile}
                        setProfilesMethods={[
                          setProfile,
                          setFollowedProfiles,
                          setFollowingProfiles,
                        ]}
                      />
                    ))}
                  />
                </Tab>
              </Tabs>
            </>
          ) : (
            <Asset children={<Spinner animation="border" />} />
          )}
        </Container>
      </Col>
      <Col md={4} className="d-none d-md-block p-0 p-md-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
