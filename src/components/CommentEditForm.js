import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "./CommentCreateEditForm.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

function CommentEditForm(props) {
  const {
    id,
    profile_id,
    content,
    setShowEditForm,
    setComments,
    profileImage,
  } = props;
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/comments/${id}/`, { content: formContent });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? { ...comment, content: formContent }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            as="textarea"
            value={formContent}
            onChange={handleChange}
            rows={4}
          />
        </InputGroup>
      </Form.Group>
      <div className="text-right">
        <button className={styles.Button} disabled={!content} type="submit">
          save
        </button>
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
        >
          cancel
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
