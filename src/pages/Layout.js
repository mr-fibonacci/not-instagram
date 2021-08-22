import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PopularProfiles from "../components/PopularProfiles";

const Layout = ({ children, width = 8, panel = <PopularProfiles /> }) => {
  return (
    <Row>
      <Col className="p-0 p-md-2" md={width}>
        {children}
      </Col>
      <Col md={12 - width} className="d-none d-md-block p-0 p-md-2">
        {panel}
      </Col>
    </Row>
  );
};

export default Layout;
