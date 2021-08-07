import React from "react";
import { Col, Row } from "reactstrap";
import StartTaskButton from "./StartTaskButton";

export default function TaskEditor(props:any) {
  const {project_id,task} = props;

  return (
    <Row>
      <Col className="d-flex justidy-content-start">
        <StartTaskButton project_id={project_id} task={task}/> 
      </Col>
    </Row>
  );
}