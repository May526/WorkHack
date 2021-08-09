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
  const { extractTasksFromEachProject }:any = useContext(ProjectsContext);

  let ongoing_projects = extractTasksFromEachProject((task:any) => task.is_ongoing);

  return (
    <Card className="m-3">
      <CardBody>
        <CardTitle>Ongoing Tasks:</CardTitle>
          <ListGroup flush>
            {ongoing_projects &&
              ongoing_projects.map((project:any,pi:number) => {
                if (!project.tasks.length) {return <div key={pi}></div>}
                return (
                  <div key={pi}>
                    {project.tasks &&
                      project.tasks.map((task:any,ti:number) => {
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
