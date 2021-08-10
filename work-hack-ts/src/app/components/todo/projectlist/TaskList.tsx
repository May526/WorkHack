import React from "react";
import { ListGroup, ListGroupItem, Badge, Row, Col } from "reactstrap";
import TaskFormButton from "./tasklist/TaskFormButton";
import { KeyObjToList } from "../../../../lib/convertTypes";
import StartTaskButton from "./tasklist/StartTaskButton";
import EditTaskButton from "./tasklist/EditTaskButton";

export default function TaskList(props: any) {
  let { tasks, project_id } = props;
  return (
    <ListGroup className="border border-primary">
      {tasks &&
        KeyObjToList(tasks, "task_id").map((task: any, index) => {
          return (
            <ListGroupItem key={index}>
              <Row className="border">
                <Col xs="2" className="d-flex justify-content-start">
                  <StartTaskButton project_id={project_id} task={task} />
                </Col>
                <Col>{task.name}</Col>
                <Col>
                  {task.point ? (
                    <Badge className="bg-secondary">{task.point} pts</Badge>
                  ) : (
                    ""
                  )}
                  {task.deadline ? (
                    <Badge className="bg-secondary">{task.deadline}</Badge>
                  ) : (
                    ""
                  )}
                  {task.estimated_time ? (
                    <Badge className="bg-secondary">
                      {task.estimated_time} min
                    </Badge>
                  ) : (
                    ""
                  )}
                </Col>
                <Col xs="2" className="d-flex justify-content-end">
                  <EditTaskButton task={task}/>
                </Col>
              </Row>
            </ListGroupItem>
          );
        })}
      <ListGroupItem>
        <TaskFormButton
          buttonLabel="+"
          className="TaskFormModal"
          project_id={project_id}
        />
      </ListGroupItem>
    </ListGroup>
  );
}
