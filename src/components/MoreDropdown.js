import React from "react";
import dots from "../assets/dots.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as Delete } from "../assets/delete.svg";
import Dropdown from "react-bootstrap/Dropdown";
import Icon from "./Icon";

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

function MoreDropdown({ handleEdit, handleDelete }) {
  return (
    <Dropdown drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleEdit}>
          <Icon component={Edit} />
          Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={handleDelete}>
          <Icon component={Delete} />
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MoreDropdown;
