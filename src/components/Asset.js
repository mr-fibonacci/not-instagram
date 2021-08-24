import React from "react";
import styles from "./Asset.module.css";

const Asset = ({ children }) => {
  return <div className={styles.Asset}>{children}</div>;
};

export default Asset;
