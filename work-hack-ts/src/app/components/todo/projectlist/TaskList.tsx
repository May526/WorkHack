import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import TaskFormButton from "./tasklist/TaskFormButton";
import {  tasks } from "../../../../lib/types";
import Task from "./tasklist/Task";

export default function TaskList(props:{project_id:string,tasks:tasks}) {
  const { project_id,tasks } = props;
  
  return (
    <ListGroup className="border">
      {Object.keys(tasks) && !(tasks==="") &&
        Object.keys(tasks).map((task_id:string, index:number) => {
          return (
            <ListGroupItem key={index}>
              <Task task={tasks[task_id]} task_id={task_id} project_id={project_id}/>
            </ListGroupItem>
          );
        })}
      <ListGroupItem>
        <TaskFormButton
          project_id={project_id}
        />
      </ListGroupItem>
    </ListGroup>
  );
}
