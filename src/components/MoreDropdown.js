import React from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(event) => {
      event.preventDefault();
      onClick(event);
    }}
  />
));

function MoreDropdown({ handleAdd, handleEdit, handleDelete }) {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className="text-center">
        <Dropdown.Item className={styles.DropdownItem} onClick={handleEdit}>
          <i className="fas fa-edit" />
        </Dropdown.Item>
        {handleDelete && (
          <Dropdown.Item className={styles.DropdownItem} onClick={handleDelete}>
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MoreDropdown;

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown
      style={{ position: "absolute", right: "0px", zIndex: 99 }}
      className="ml-auto px-3"
      drop="left"
    >
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit`)}>
          edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
        >
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
        >
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
