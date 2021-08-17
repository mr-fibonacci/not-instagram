import React from "react";
import styles from "./Icon.module.css";

function Icon({ component: Component, text, nav = false }) {
  return (
    <span className={`${styles.Icon} ${nav ? styles.NavIcon : ""}`}>
      <Component style={{ marginRight: "7px", marginLeft: "12px" }} />
      {text}
    </span>
  );
}

export default Icon;
