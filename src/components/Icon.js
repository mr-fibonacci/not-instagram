import React from "react";
import styles from "./Icon.module.css";

function Icon({ component: Component }) {
  return (
    <span style={{ padding: "10px" }}>
      <Component className={styles.icon} />
    </span>
  );
}

export default Icon;
