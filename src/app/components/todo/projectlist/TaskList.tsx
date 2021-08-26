import React, { useState } from "react";
import {
  Button,
  Col,
  Collapse,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import TaskFormButton from "./tasklist/TaskFormButton";
import { task, tasks } from "../../../../lib/types";
import Task from "./tasklist/Task";
import { getChildren } from "../../../../lib/filters";

export default function TaskList(props: {
  project_id: string;
  tasks: tasks;
  parent_task_id: string;
}) {
  const { project_id, tasks, parent_task_id } = props;

  const children_tasks = getChildren(tasks ?? {}, parent_task_id);

  return (
    <ListGroup flush className="border-start">
      {!(tasks === "") &&
        Object.keys(children_tasks) &&
        Object.keys(children_tasks).map((task_id: string, index: number) => {
          const task = tasks[task_id];
          return (
            <ListGroupItem key={index}>
              <FoldableTaskList
                task_id={task_id}
                task={task}
                project_id={project_id}
                tasks={tasks}
              />
            </ListGroupItem>
          );
        })}
      <ListGroupItem>
        <TaskFormButton
          project_id={project_id}
          parent_task_id={parent_task_id}
        />
      </ListGroupItem>
    </ListGroup>
  );
}

function FoldableTaskList(props: {
  task: task;
  task_id: string;
  project_id: string;
  tasks: tasks;
}) {
  const { task, task_id, project_id, tasks } = props;

  const [isOpen, setIsOpen] = useState(false);
  const toggle_isOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <Row>
        <Col xs="1">
          <Button onClick={toggle_isOpen} size="sm">
            {isOpen ? "hide" : "show"}
          </Button>
        </Col>
        <Col>
          <Task task={task} task_id={task_id} project_id={project_id} />
        </Col>
      </Row>
      <Collapse isOpen={isOpen}>
        <TaskList
          project_id={project_id}
          tasks={tasks}
          parent_task_id={task_id}
        />
      </Collapse>
    </div>
  );
}
