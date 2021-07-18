import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import CommentEditForm from "./CommentEditForm";
import dots from "../assets/dots.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as Remove } from "../assets/remove.svg";
import Icon from "./Icon";
import Avatar from "./Avatar";

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <img
    role="button"
    alt="more options"
    src={dots}
    height={25}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

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
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments: prevPost.results[0].comments - 1,
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
  return (
    <Card>
      <Card.Body>
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={70} />
          </Link>

          {showEditForm ? (
            <CommentEditForm
              id={id}
              content={content}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <>
              <Media.Body className="align-self-center">
                <b>{owner}</b> {content}
              </Media.Body>
              {is_owner && !showEditForm && (
                <Dropdown drop="left">
                  <Dropdown.Toggle as={ThreeDots}></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowEditForm(true)}>
                      <Icon component={Edit} />
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleDelete}>
                      <Icon component={Remove} />
                      Remove
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </>
          )}
        </Media>
      </Card.Body>
    </Card>
  );
}

export default Comment;
