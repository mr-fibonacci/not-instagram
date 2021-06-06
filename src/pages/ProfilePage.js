import axios from "axios";
import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useParams } from "react-router";
import Post from "../components/Post";
import Profile from "../components/Profile";

function ProfilePage() {
  const { id } = useParams();

  const [[profile], setProfile] = useState([{}]);
  const [profilePosts, setProfilePosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [feedPosts, setFeedPosts] = useState([]);
  const [followingProfiles, setFollowingProfiles] = useState([]);
  const [followedProfiles, setFollowedProfiles] = useState([]);

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
      setProfile([profile]);
      setProfilePosts(profilePosts.results);
      setLikedPosts(likedPosts.results);
      setFeedPosts(feedPosts.results);
      setFollowingProfiles(followingProfiles.results);
      setFollowedProfiles(followedProfiles.results);
    } catch (err) {
      console.log(err.request);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
    <Profile {...profile} setProfilesMethods={[setProfile, setFollowedProfiles, setFollowingProfiles]} />
      <Tabs transition={null}>
        <Tab eventKey="posts" title="posts">
          {profilePosts?.map((post) => (
            <Post
              key={post.id}
              {...post}
              setPostsMethods={[setProfilePosts, setLikedPosts, setFeedPosts]}
            />
          ))}
        </Tab>
        <Tab eventKey="liked" title="liked">
          {likedPosts?.map((post) => (
            <Post
              key={post.id}
              {...post}
              setPostsMethods={[setProfilePosts, setLikedPosts, setFeedPosts]}
            />
          ))}
        </Tab>
        <Tab eventKey="feed" title="feed">
          {feedPosts?.map((post) => (
            <Post
              key={post.id}
              {...post}
              setPostsMethods={[setProfilePosts, setLikedPosts, setFeedPosts]}
            />
          ))}
        </Tab>
        <Tab eventKey="followers" title="followers">
          {followedProfiles?.map((profile) => (
            <Profile
              key={profile.id}
              {...profile}
              setProfilesMethods={[setProfile, setFollowedProfiles, setFollowingProfiles]}
            />
          ))}
        </Tab>{" "}
        <Tab eventKey="following" title="following">
          {followingProfiles?.map((profile) => (
            <Profile
              key={profile.id}
              {...profile}
              setProfilesMethods={[setProfile, setFollowedProfiles, setFollowingProfiles]}
            />
          ))}
        </Tab>
      </Tabs>
    </>
  );
}

export default ProfilePage;
