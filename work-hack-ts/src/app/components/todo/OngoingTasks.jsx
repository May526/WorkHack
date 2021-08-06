import React, { useContext } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import CompletedButton from "./ongoingtasks/CompletedButton";


export default function OngoingTasks() {
  const { extractTasksFromEachProject } = useContext(ProjectsContext);

  let ongoing_projects = extractTasksFromEachProject((task) => task.is_ongoing);

  return (
    <Card className="m-3">
      <CardBody>
        <CardTitle>You are doing</CardTitle>
          <ListGroup flush>
            {ongoing_projects &&
              ongoing_projects.map((project,pi) => {
                if (!project.tasks.length) {return <div key={pi}></div>}
                return (
                  <div key={pi}>
                    {project.tasks &&
                      project.tasks.map((task,ti) => {
                        return (
                          <ListGroupItem key={ti}>
                            <Row>
                              <Col>
                                {task.name}
                                <Badge className="bg-secondary">
                                  {project.name}
                                </Badge>
                              </Col>
                              <Col className="d-flex justify-content-end">
                                <CompletedButton project_id={project.project_id} task={task} />
                              </Col>
                            </Row>
                          </ListGroupItem>
                        );
                      })}
                  </div>
                );
              })}
          </ListGroup>
      </CardBody>
    </Card>
  );
}
