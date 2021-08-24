import React from "react";
import styles from "./Avatar.module.css";

function Avatar({ src, height = 45, text }) {
  return (
    <span style={{ lineHeight: "45px" }}>
      <img className={styles.Avatar} alt="avatar" src={src} height={height} />
      {text}
    </span>
  );
}

export default Avatar;
