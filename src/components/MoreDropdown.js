import React from "react";
import dots from "../assets/dots.svg";
import { ReactComponent as Add } from "../assets/add-post.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as Delete } from "../assets/delete.svg";
import Dropdown from "react-bootstrap/Dropdown";
import Icon from "./Icon";
import styles from "./MoreDropdown.module.css";

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <img
    // style={{ position: "absolute", right: "0px", zIndex: 99 }}
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

function MoreDropdown({ handleAdd, handleEdit, handleDelete }) {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item className={styles.DropdownItem} onClick={handleEdit}>
          <Icon label="edit" component={Edit} />
          {/* Edit */}
        </Dropdown.Item>
        {handleAdd && (
          <Dropdown.Item className={styles.DropdownItem} onClick={handleAdd}>
            <Icon label="add" component={Add} />
            {/* Add a post */}
          </Dropdown.Item>
        )}
        {handleDelete && (
          <Dropdown.Item className={styles.DropdownItem} onClick={handleDelete}>
            <Icon label="delete" component={Delete} />
            {/* Delete */}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MoreDropdown;
