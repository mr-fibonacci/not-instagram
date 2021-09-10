import React from "react";
import styles from "./Asset.module.css";

const Asset = ({ children, message }) => {
  return (
    <div className={styles.Asset}>
      {children}
      <p className="mt-3">{message}</p>
    </div>
  );
};

export default Asset;
