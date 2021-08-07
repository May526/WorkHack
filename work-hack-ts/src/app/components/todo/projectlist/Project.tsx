import React, { useContext } from "react";
import { Col, Row } from "reactstrap";
import { ProjectsContext } from "../../../contexts/ProjectsContext";
import TaskList from "./TaskList";

export default function Project(props:any) {
  const { project } = props;
  const { getTasks}:any = useContext(ProjectsContext);

  return (
    <div>
      <Row>
        <h2>{project.name}</h2>
      </Row>
      <Row>
        <Col>
          <TaskList
            tasks={getTasks(project.project_id)}
            project_id={project.project_id}
          />
        </Col>
      </Row>
    </div>
  );
}