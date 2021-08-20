import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { AuthContext } from "../../../../auth/AuthProvider";
import { fetchProject_on } from "../../../../database/database_read";
import { Project } from "../../../../lib/classes";
import ProjectDeleteButton from "./ProjectDeleteButton";
import ProjectEditButton from "./ProjectEditButton";
import TaskList from "./TaskList";

export default function ProjectComp(props: { project_id: string }) {
  const currentUser = useContext(AuthContext);
  const { project_id } = props;
  const [project, setProject] = useState(
    new Project(currentUser as firebase.default.User)
  );
  
  useEffect(() => {
    fetchProject_on(project_id, setProject);
  }, [project_id]);

  return (
    <div>
      <Row>
        <Col>
          <h2>{project.name}</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <ProjectEditButton project_id={project_id} project={project} />
          <ProjectDeleteButton project_id={project_id} project={project}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <TaskList tasks={project.tasks} project_id={project_id} parent_task_id={""}/>
        </Col>
      </Row>
    </div>
  );
}
