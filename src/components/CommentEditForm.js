import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "./CommentCreateEditForm.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import Avatar from "./Avatar";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments, profileImage } = props;
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
          <Avatar src={profileImage} height={70} />
          <Form.Control
            className={styles.Form}
            as="textarea"
            value={formContent}
            onChange={handleChange}
          />
          <button className={styles.Button} disabled={!content} type="submit">
            save
          </button>
          <button
            className={styles.Button}
            onClick={() => setShowEditForm(false)}
          >
            cancel
          </button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}

export default CommentEditForm;
