import React from "react";
import { ListGroup, ListGroupItem, Badge, Row, Col } from "reactstrap";
import TaskFormButton from "./tasklist/TaskFormButton";
import TaskEditor from "./tasklist/TaskEditor";

export default function TaskList(props) {
  let { tasks , project_id} = props;
  return (
    <ListGroup className="border border-primary">
      {tasks &&
        Object.entries(tasks).map(([key,value])=>{return {task_id:key,...value}}).map((task, index) => {
          return (
            <ListGroupItem key={index}>
              <Row className="border">
                <Col xs="2">
                  <TaskEditor
                    project_id={project_id}
                    task={task}
                  />
                </Col>
                <Col>
                  {task.name}
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