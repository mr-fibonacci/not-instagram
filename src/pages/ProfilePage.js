import axios from "axios";
import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useParams } from "react-router";
import Post from "../components/Post";
import Profile from "../components/Profile";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData, setNext } from "../utils";
import Spinner from "react-bootstrap/Spinner";
import Content from "../components/Content";

import "./ProfilePage.css";

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
      setProfilePosts(setNext(profilePosts));
      setFollowingProfiles(setNext(followingProfiles));
      setFollowedProfiles(setNext(followedProfiles));
      setHasLoaded(true);
    } catch (err) {
      console.log(err.request);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return hasLoaded ? (
    <>
      <Content>
        <Profile
          {...profile.results[0]}
          setProfilesMethods={[
            setProfile,
            setFollowedProfiles,
            setFollowingProfiles,
          ]}
          imageSize={120}
          // is_owner={true}
          // is_owner={profile.results[0].is_owner}
        />
        <Tabs variant="pills">
          <Tab eventKey="posts" title="posts">
            <InfiniteScroll
              dataLength={profilePosts.results.length}
              next={() => fetchMoreData(profilePosts, setProfilePosts)}
              hasMore={!!profilePosts.next}
              children={profilePosts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setProfilePosts} />
              ))}
            />
          </Tab>
          <Tab eventKey="followers" title="followers">
            <InfiniteScroll
              dataLength={followedProfiles.results.length}
              next={() => fetchMoreData(followedProfiles, setFollowedProfiles)}
              hasMore={!!followedProfiles.next}
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
      </Content>
    </>
  ) : (
    <div style={{ border: "1px black solid", display: "flex" }}>
      <Spinner animation="border" />
    </div>
  );
}

export default ProfilePage;