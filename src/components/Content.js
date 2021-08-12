import React from "react";
import styles from "./Content.module.css";
import Container from "react-bootstrap/Container";

function Content({ children }) {
  return <Container className={styles.Content}>{children}</Container>;
}

export default Content;
