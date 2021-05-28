import React from "react";
import Media from "react-bootstrap/Media";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Comment(props) {
  const { id, owner, is_owner, profile_id, profile_image, content } = props;
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
          <Media.Body className="align-self-center">{content}</Media.Body>
        </Media>
        {/* <Card.Text></Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default Comment;
