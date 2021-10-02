import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { registerTask } from "../../../../../database/database_write";
import { Task } from "../../../../../lib/classes";
import { CompletedTaskInput, OngoingTaskInput, TodoTaskInput } from "../../../../../lib/types";
import CompletedTaskForm from "./taskform/CompletedTaskForm";
import OngoingTaskForm from "./taskform/OngoingTaskForm";
import TodoTaskForm from "./taskform/TodoTaskForm";

export default function TaskForm(props: {
  project_id: string;
  parent_task_id: string;
}) {
  const { project_id, parent_task_id } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const onSubmit_todo: SubmitHandler<TodoTaskInput> = (inputs) => {
    const new_task = new Task();
    Object.assign(new_task, inputs);
    registerTask(project_id, new_task);
    toggle_modal();
  };


  const onSubmit_ongoing: SubmitHandler<OngoingTaskInput> = (inputs) => {
    const new_task = new Task();
    Object.assign(new_task, {
      name: inputs.name,
      point: inputs.point,  
      deadline: inputs.deadline,
      parent_id: inputs.parent,
      started_at: inputs.started_at._d? inputs.started_at._d.getTime() : inputs.started_at.getTime(),
      is_ongoing: true,
    });
    registerTask(project_id, new_task);
    toggle_modal();
  };

  const onSubmit_completed: SubmitHandler<CompletedTaskInput> = (inputs) => {
    const new_task = new Task();
    Object.assign(new_task, {
      name: inputs.name,
      point: inputs.point,  
      deadline: inputs.deadline,
      parent_id: inputs.parent,
      started_at: inputs.started_at._d? inputs.started_at._d.getTime() : inputs.started_at.getTime(),
      completed_at: inputs.completed_at._d? inputs.completed_at._d.getTime() : inputs.completed_at.getTime(),
      is_completed:true,
    });
    registerTask(project_id, new_task);
    toggle_modal();
  };

  const [task_status, setTaskStatus] = useState<
    "todo" | "ongoing" | "completed"
  >("todo");

  return (
    <div>
      <Button size="sm" color="dark" onClick={toggle_modal}>
        +
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle_modal}
        className="TaskFormModal"
        fade={false}
      >
        <ModalHeader toggle={toggle_modal}>
          Add a {task_status} task
        </ModalHeader>
        <ModalBody>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              onClick={() => setTaskStatus("todo")}
              type="button"
              className="btn btn-outline-primary"
            >
              to do
            </button>
            <button
              onClick={() => setTaskStatus("ongoing")}
              type="button"
              className="btn btn-outline-primary"
            >
              ongoing
            </button>
            <button
              onClick={() => setTaskStatus("completed")}
              type="button"
              className="btn btn-outline-primary"
            >
              completed
            </button>
          </div>
          {task_status === "todo" ? (
            <TodoTaskForm
              unique_id={project_id}
              parent_task_id={parent_task_id}
              onSubmit={onSubmit_todo}
            />
          ) : task_status === "ongoing" ? (
            <OngoingTaskForm 
            unique_id={project_id}
            parent_task_id={parent_task_id}
            onSubmit={onSubmit_ongoing}
            />
          ) : (
            <CompletedTaskForm 
            unique_id={project_id}
            parent_task_id={parent_task_id}
            onSubmit={onSubmit_completed}
            />
          )}
          <Row>
            <Col>
              <button  className="w-100" type="button" onClick={toggle_modal}>
                Cancel
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}
