import axios from "axios";
import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useHistory, useParams } from "react-router";
import Post from "../components/Post";
import Profile from "../components/Profile";

function ProfilePage() {
  const history = useHistory();
  const { id } = useParams();

  const [profilePageData, setProfilePageData] = useState({
    profile: null,
    profilePosts: [],
    likedPosts: [],
    feedPosts: [],
    followingProfiles: [],
    followedProfiles: [],
  });
  const {
    profile,
    profilePosts,
    likedPosts,
    feedPosts,
    followingProfiles,
    followedProfiles,
  } = profilePageData;

  const fetchData = async () => {
    try {
      const [
        { data: profile },
        { data: profilePosts },
        { data: likedPosts },
        { data: feedPosts },
        { data: followingProfiles },
        { data: followedProfiles },
      ] = await Promise.all([
        axios.get(`/profiles/${id}`),
        axios.get(`/posts/?owner__profile=${id}`),
        axios.get(`/posts/?likes__owner__profile=${id}`),
        axios.get(`/posts/?owner__followed__owner__profile=${id}`),
        axios.get(`/profiles/?owner__followed__owner__profile=${id}`),
        axios.get(`/profiles/?owner__following__followed__profile=${id}`),
      ]);
      setProfilePageData({
        profile,
        profilePosts,
        likedPosts,
        feedPosts,
        followingProfiles,
        followedProfiles,
      });
    } catch (err) {
      console.log(err.request);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Profile profile={profile} />
      <Tabs>
        <Tab eventKey="posts" title="posts">
          {profilePosts.results?.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </Tab>
        <Tab eventKey="liked" title="liked">
          {likedPosts.results?.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </Tab>
        <Tab eventKey="feed" title="feed">
          {feedPosts.results?.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </Tab>
        <Tab eventKey="following" title="following">
          {followingProfiles.results?.map((profile) => (
            <Profile key={profile.id} {...profile} />
          ))}
        </Tab>
        <Tab eventKey="followers" title="followers">
          {followedProfiles.results?.map((profile) => (
            <Profile key={profile.id} {...profile} />
          ))}
        </Tab>
      </Tabs>
    </>
  );
}

export default ProfilePage;
