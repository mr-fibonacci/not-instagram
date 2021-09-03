import React from "react";
import styles from "./Icon.module.css";

function Icon({ component: Component, text, nav = false, label }) {
  return (
    <span
      aria-label={label}
      className={`${styles.Icon} ${nav ? styles.NavIcon : ""}`}
    >
      <Component className="mx-2" />
      {text}
    </span>
  );
}

export default Icon;
