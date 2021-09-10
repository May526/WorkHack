import React from "react";
import { Badge, Col, Row } from "reactstrap";
import { task, tasks } from "../../../../../lib/types";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import StartTaskButton from "./StartTaskButton";

export default function Task(props: {
  task: task;
  project_id: string;
  task_id: string;
  tasks: tasks;
}) {
  const { task, project_id, task_id,tasks } = props;
  return (
    <Row className="border-bottom">
      <Col xs="2" className="d-flex justify-content-start">
        <StartTaskButton
          project_id={project_id}
          task_id={task_id}
          task={task}
        />
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
          <Badge className="bg-secondary">{task.estimated_time} min</Badge>
        ) : (
          ""
        )}
      </Col>
      <Col xs="2" className="d-flex justify-content-end">
        <EditTaskButton task={task} project_id={project_id} task_id={task_id}/>
        <DeleteTaskButton project_id={project_id} task_id={task_id} task={task} tasks={tasks}/>
      </Col>
    </Row>
  );
}
