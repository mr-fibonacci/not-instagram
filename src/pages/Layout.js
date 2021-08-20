import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Layout = ({ children, width = 8 }) => {
  return (
    <Row>
      <Col className="d-none d-md-block" />
      <Col className="px-0" md={width + 1} lg={width - 1}>
        {children}
      </Col>
      <Col className="d-none d-md-block" />
    </Row>
  );
};

export default Layout;
