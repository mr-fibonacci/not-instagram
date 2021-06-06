import axios from "axios";
import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useHistory, useParams } from "react-router";
import Post from "../components/Post";
import Profile from "../components/Profile";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { id } = useParams();
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const {
    content,
    followers,
    following,
    following_id,
    posts,
    image,
    is_owner,
    name,
    owner,
  } = profile;
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
      setProfile(profile);
      setProfilePosts(profilePosts.results);
      setLikedPosts(likedPosts.results);
      setFeedPosts(feedPosts.results);
      setFollowingProfiles(followingProfiles.results);
      setFollowedProfiles(followedProfiles.results);
    } catch (err) {
      console.log(err.request);
    }
  };

  const handleFollow = async () => {
    try {
      const { data } = await axios.post("/followers/", { followed: id });
      setProfile({
        ...profile,
        followers: profile.followers + 1,
        following_id: data.id,
      });
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleUnfollow = async () => {
    try {
      await axios.delete(`/followers/${profile.following_id}/`);
      setProfile({
        ...profile,
        followers: profile.followers - 1,
        following_id: null,
      });
    } catch (err) {
      console.log(err.request);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <Media>
        <Link to={`/profiles/${id}`}>
          <img width="150px" className="align-self-center" src={image} />
          {`${owner} posts: ${posts} followers: ${followers} following: ${following}`}
        </Link>
      </Media>
      {is_owner ? (
        <>
          <Button onClick={() => history.push(`/profiles/${id}/edit`)}>
            edit
          </Button>
          <Button onClick={() => history.push("/posts/create")}>
            add a post
          </Button>
        </>
      ) : following_id ? (
        <Button onClick={handleUnfollow}>unfollow</Button>
      ) : (
        <Button onClick={handleFollow}>follow</Button>
      )}
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
              setProfilesMethods={[setFollowedProfiles, setFollowingProfiles]}
            />
          ))}
        </Tab>{" "}
        <Tab eventKey="following" title="following">
          {followingProfiles?.map((profile) => (
            <Profile
              key={profile.id}
              {...profile}
              setProfilesMethods={[setFollowedProfiles, setFollowingProfiles]}
            />
          ))}
        </Tab>
      </Tabs>
    </>
  );
}

export default ProfilePage;
