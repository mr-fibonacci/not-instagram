import axios from "axios";
import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useParams } from "react-router";
import Post from "../components/Post";
import Profile from "../components/Profile";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../utils";

function ProfilePage() {
  const { id } = useParams();

  const [[profile], setProfile] = useState([{}]);
  const [profilePosts, setProfilePosts] = useState({
    count: 0,
    results: [],
  });
  const [followingProfiles, setFollowingProfiles] = useState({
    count: 0,
    results: [],
  });
  const [followedProfiles, setFollowedProfiles] = useState({
    count: 0,
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
        axios.get(`/profiles/${id}`),
        axios.get(`/posts/?owner__profile=${id}`),
        axios.get(`/profiles/?owner__followed__owner__profile=${id}`),
        axios.get(`/profiles/?owner__following__followed__profile=${id}`),
      ]);
      setProfile([profile]);
      setProfilePosts(profilePosts);
      setFollowingProfiles(followingProfiles);
      setFollowedProfiles(followedProfiles);
    } catch (err) {
      console.log(err.request);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <Profile
        {...profile}
        setProfilesMethods={[
          setProfile,
          setFollowedProfiles,
          setFollowingProfiles,
        ]}
      />
      <Tabs>
        <Tab eventKey="posts" title="posts">
          {profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
        </Tab>
        <Tab eventKey="followers" title="followers">
          {followedProfiles.results.map((profile) => (
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
        </Tab>
        <Tab eventKey="following" title="following">
          <InfiniteScroll
            dataLength={followingProfiles.results.length}
            next={() => fetchMoreData(followingProfiles, setFollowingProfiles)}
            hasMore={!!followingProfiles.next}
          >
            {followingProfiles.results.map((profile) => (
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
          </InfiniteScroll>
        </Tab>
      </Tabs>
    </>
  );
}

export default ProfilePage;
