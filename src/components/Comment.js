import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import axios from "axios";
import CommentEditForm from "./CommentEditForm";
import Avatar from "./Avatar";
import MoreDropdown from "./MoreDropdown";
import { useCurrentUser } from "../CurrentUserContext";

function Comment(props) {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    content,
    setComments,
    setPost,
  } = props;
  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const handleDelete = async () => {
    try {
      await axios.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err.request);
    }
  };

  return showEditForm ? (
    <CommentEditForm
      id={id}
      profile_id={profile_id}
      content={content}
      profileImage={profile_image}
      setComments={setComments}
      setShowEditForm={setShowEditForm}
    />
  ) : (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={70} />
        </Link>
        <Media.Body className="align-self-center">
          <b>{owner}</b> {content}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
}

export default Comment;
