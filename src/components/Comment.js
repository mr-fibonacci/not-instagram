import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import CommentEditForm from "./CommentEditForm";

function Comment(props) {
  const {
    id,
    owner,
    is_owner,
    profile_id,
    profile_image,
    content,
    setComments,
    setPost,
  } = props;
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/comments/${id}/`);
      setPost(([prevPost]) => [
        { ...prevPost, comments: prevPost.comments - 1 },
      ]);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <Card>
      <Card.Body>
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <img
              width="70px"
              className="align-self-center"
              src={profile_image}
            />
            {owner}{" "}
          </Link>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              content={content}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <Media.Body className="align-self-center">{content}</Media.Body>
          )}
        </Media>
        {is_owner && !showEditForm ? (
          <>
            <Button onClick={() => setShowEditForm(true)}>edit</Button>
            <Button onClick={handleDelete}>delete</Button>
          </>
        ) : null}
        {/* <Card.Text></Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default Comment;
