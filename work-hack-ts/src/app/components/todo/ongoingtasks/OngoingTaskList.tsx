import React, { useContext, useEffect, useState } from "react";
import { Badge, Col, ListGroupItem, Row } from "reactstrap";
import { AuthContext } from "../../../../auth/AuthProvider";
import { fetchProject_on } from "../../../../database/database_read";
import { Project } from "../../../../lib/classes";
import { project } from "../../../../lib/types";
import CompletedButton from "./CompletedButton";

export default function OngoingTaskList(props: { project_id: string }) {
  const { project_id } = props;
  const currentUser = useContext(AuthContext);
  const [project, setProject] = useState<project>(
    new Project(currentUser as firebase.default.User)
  );
  useEffect(() => {
    fetchProject_on(project_id, setProject);
  }, [currentUser, project_id]);
  const ongoing_task_entries = Object.entries(project.tasks).filter(
    ([task_id, task]) => {
      return task.is_ongoing;
    }
  );

  return (
    <div>
      {ongoing_task_entries &&
        ongoing_task_entries.map(([task_id, task], index) => {
          return (
            <ListGroupItem key={index}>
              <Row>
                <Col>
                  {task.name}
                  <Badge className="bg-primary">{project.name}</Badge>
                </Col>
                <Col className="d-flex justify-content-end">
                  <CompletedButton project_id={project_id} task_id={task_id} />
                </Col>
              </Row>
            </ListGroupItem>
          );
        })}
    </div>
  );
}
