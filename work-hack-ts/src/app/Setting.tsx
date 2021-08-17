import React from "react";
import { Row } from "reactstrap";

export default function Setting() {
  console.log("render: Setting.tsx")
  return (
    <div>
      <div className="d-flex border-bottom">
        <h1 className="h2">Setting Page</h1>
      </div>
      <Row>theme color : no theme</Row>
      <Row>Todo style : no style</Row>
      <Row>[ ] Stop mind tracking function</Row>
      <Row>[ ] Stop goal setting function</Row>
    </div>
  );
}
