import React from "react";
import styles from "./Icon.module.css";

function Icon({ component: Component, text }) {
  return (
    <span className={styles.Icon}>
      <Component style={{ marginRight: "2px" }} />
      {text}
    </span>
  );
}

export default Icon;
