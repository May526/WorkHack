import React from "react";
import { Col, Row } from "reactstrap";
import Header from "./comp/Header";

export default function homepage() {
  
  return (
    <Row>
      <Col xs="1">
        <Header />
      </Col>
      <Col>
        <h1 className="display-4 text-center">Work Hack</h1>
      </Col>
    </Row>
  );
}
