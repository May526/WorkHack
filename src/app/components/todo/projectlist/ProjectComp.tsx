import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Collapse, Row } from "reactstrap";
import { AuthContext } from "../../../../auth/AuthProvider";
import { fetchProject_on } from "../../../../database/database_read";
import { Project } from "../../../../lib/classes";
import { tasks } from "../../../../lib/types";
import ProjectDeleteButton from "./ProjectDeleteButton";
import ProjectEditButton from "./ProjectEditButton";
import TaskList from "./TaskList";

export default function ProjectComp(props: { project_id: string }) {
  const {currentUser} = useContext(AuthContext);
  const { project_id } = props;
  const [project, setProject] = useState(
    new Project(currentUser as firebase.default.User)
  );

  useEffect(() => {
    fetchProject_on(project_id, setProject);
  }, [project_id]);

  const [is_open, setIsOpen] = useState(false);
  const toggle_folded = () => setIsOpen(!is_open);

  return (
    <div>
      <Row>
        <Col xs="2">
          <Button onClick={toggle_folded} size="sm" className="w-100">
            {(is_open ? "hide" : ("show" + (project.tasks ? " ("+Object.keys(project.tasks).length+")":" (0)")))}
          </Button>
        </Col>
        <Col>
          <h2>{project.name}</h2>
        </Col>

        <Col className="d-flex justify-content-end">
          <ProjectEditButton project_id={project_id} project={project} />
          <ProjectDeleteButton project_id={project_id} project={project} />
        </Col>
      </Row>
      <Collapse isOpen={is_open}>
        <Row>
          <Col>
            <TaskList
              tasks={project.tasks ?? ({} as tasks)}
              project_id={project_id}
              parent_task_id={""}
            />
          </Col>
        </Row>
      </Collapse>
    </div>
  );
}
