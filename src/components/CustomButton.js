import React from "react";
import styles from "./CustomButton.module.css";

function CustomButton({ colour = "bright", text }) {
  const getClassName = () => {
    switch (colour) {
      case "blue":
        return styles.Blue;
      case "blue-outline":
        return styles.BlueOutline;
      case "black":
        return styles.Black;
      case "black-outline":
        return styles.BlackOutline;
      default:
        return styles.Bright;
    }
  };
  const className = getClassName();

  return (
    <button className={`${styles.Button} ${className}`}>
      <b>{text}</b>
    </button>
  );
}

export default CustomButton;
