import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import TaskFormButton from "./tasklist/TaskFormButton";
import { tasks } from "../../../../lib/types";
import Task from "./tasklist/Task";
import { getChildren } from "../../../../lib/filters";

export default function TaskList(props: {
  project_id: string;
  tasks: tasks;
  parent_task_id: string;
}) {
  const { project_id, tasks, parent_task_id } = props;

  const children_tasks = getChildren(tasks, parent_task_id);

  return (
    <ListGroup flush className="border-start">
      {!(tasks === "") &&
        Object.keys(children_tasks) &&
        Object.keys(children_tasks).map((task_id: string, index: number) => {
          const task = tasks[task_id];
          return (
            <ListGroupItem key={index} >
              <Task task={task} task_id={task_id} project_id={project_id} />
              <TaskList
                project_id={project_id}
                tasks={tasks}
                parent_task_id={task_id}
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
