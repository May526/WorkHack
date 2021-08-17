import React from "react";
import { Row, Col } from "reactstrap";
import ProjectList from "./components/todo/ProjectList";
import OngoingTasks from "./components/todo/OngoingTasks";


export default function TodoPage() {
  console.log("render: Todo.tsx");
  return (
    <div>
      <Row>
        <Col>
        <OngoingTasks />
        </Col>
      </Row>
      <Row>
        <Col>
        <ProjectList />
        </Col>
      </Row>
    </div>
  );
}
