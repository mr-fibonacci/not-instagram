import React from "react";
import iconStyles from "./Icon.module.css";
import styles from "./Avatar.module.css";

function Avatar({ src, height = 27, text }) {
  return (
    <span className={iconStyles.Icon}>
      <img className={styles.Avatar} alt="avatar" src={src} height={height} />
      {text}
    </span>
  );
}

export default Avatar;
