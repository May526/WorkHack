import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { registerTask } from "../../../../database/database_write";
import { Feeling, Task } from "../../../../lib/classes";
import { peToNum } from "../../../../lib/convertTypes";
import { CompletedTaskInput, OngoingTaskInput, TodoTaskInput } from "../../../../lib/types";
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
    const before_feeling = peToNum(inputs.before_feeling)
    Object.assign(new_task, {
      name: inputs.name,
      point: inputs.point,  
      deadline: inputs.deadline,
      parent_id: inputs.parent,
      started_at: inputs.started_at._d? inputs.started_at._d.getTime() : inputs.started_at.getTime(),
      is_ongoing: true,
      feelings:{
        before:new Feeling(before_feeling.energy,before_feeling.pleasantness,null)
      }
    });
    registerTask(project_id, new_task);
    toggle_modal();
  };

  const onSubmit_completed: SubmitHandler<CompletedTaskInput> = (inputs) => {
    const new_task = new Task();
    const before_feeling = peToNum(inputs.before_feeling)
    const after_feeling = peToNum(inputs.after_feeling)
    Object.assign(new_task, {
      name: inputs.name,
      point: inputs.point,  
      deadline: inputs.deadline,
      parent_id: inputs.parent,
      started_at: inputs.started_at._d? inputs.started_at._d.getTime() : inputs.started_at.getTime(),
      completed_at: inputs.completed_at._d? inputs.completed_at._d.getTime() : inputs.completed_at.getTime(),
      is_completed:true,
      feelings:{
        before:new Feeling(before_feeling.energy,before_feeling.pleasantness,null),
        after:new Feeling(after_feeling.energy,after_feeling.pleasantness,inputs.is_ralated_with_task)
      }
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
