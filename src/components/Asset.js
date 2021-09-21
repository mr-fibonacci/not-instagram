import React from "react";
import styles from "../styles/Asset.module.css";

const Asset = ({ children, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {children}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
