import React from "react";
import styles from "./Avatar.module.css";

function Avatar({ src, height = 30 }) {
  return (
    <img className={styles.Avatar} alt="avatar" src={src} height={height} />
  );
}

export default Avatar;
