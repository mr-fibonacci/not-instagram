import axios from "axios";
import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import Profile from "../components/Profile";

function ProfilePage(props) {
  const { history } = props;
  const { id } = props.match.params;
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [fetchedProfile, fetchedPosts] = await Promise.all([
        axios.get(`/profiles/${id}/`),
        axios.get(`/posts/?owner__profile=${id}`),
      ]);
      console.log(fetchedProfile.data, fetchedPosts.data);
      setProfile(fetchedProfile.data);
      setPosts(fetchedPosts.data.results);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <div>
      <Profile {...profile} history={history} />
      <h1>Posts:</h1>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default ProfilePage;
