import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
} from "reactstrap";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import OngoingTaskList from "./OngoingTaskList";


export default function OngoingTasks() {
  const project_ids = useContext(ProjectsContext);
  return (
    <Card className="m-3">
      <CardBody>
        <CardTitle>Ongoing Tasks:</CardTitle>
          <ListGroup flush>
            {project_ids &&
              project_ids.map((project_id:string,index:number) => {
                return (
                  <div key={index}>
                    <OngoingTaskList project_id={project_id} />
                  </div>
                );
              })}
          </ListGroup>
      </CardBody>
    </Card>
  );
}
