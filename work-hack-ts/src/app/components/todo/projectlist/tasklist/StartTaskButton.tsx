import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import {
  updateFeeling,
  updateTask,
} from "../../../../../database/database_write";
import { feeling, task } from "../../../../../lib/types";
import { SubmitHandler, useForm } from "react-hook-form";

export default function StartTaskButton(props: {
  project_id: string;
  task_id: string;
  task: task;
}) {
  const { project_id, task_id, task } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const { register, handleSubmit, reset, watch } = useForm();

  const onSubmit: SubmitHandler<feeling> = (data) => {
    updateFeeling(project_id, task_id, "before", data);
    updateTask(project_id, task_id, "is_ongoing", true);
    updateTask(project_id, task_id, "started_at", Date.now());
    reset();
    toggle_modal();
  };

  const taskColor = (task: task) => {
    if (task.is_completed) {
      return "success";
    } else if (task.is_ongoing) {
      return "danger";
    } else {
      return "secondary";
    }
  };
  const makeButtonLabel = (task: task) => {
    if (task.is_completed) {
      return "Completed";
    } else if (task.is_ongoing) {
      return "Ongoing";
    } else {
      return "Do this task";
    }
  };
  return (
    <div>
      <Button
        size="sm"
        color={taskColor(task)}
        onClick={task.is_ongoing || task.is_completed ? () => {} : toggle_modal}
      >
        {makeButtonLabel(task)}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle_modal}
        className="StartTaskModal"
        fade={false}
      >
        <ModalHeader>Start {task.name}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="d-flex justify-content-end">
                <label htmlFor={`${project_id}${task_id}before_energy`}>
                  energy : {watch("energy")}
                </label>
              </Col>
              <Col>
                <input
                  id={`${project_id}${task_id}before_energy`}
                  type="range"
                  max="10"
                  min="1"
                  step="1"
                  {...register("energy", { required: true })}
                />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                <label htmlFor={`${project_id}${task_id}before_pleasantness`}>
                  pleasantness : {watch("pleasantness")}
                </label>
              </Col>
              <Col>
                <input
                  id={`${project_id}${task_id}before_pleasantness`}
                  type="range"
                  max="10"
                  min="1"
                  step="1"
                  {...register("pleasantness", { required: true })}
                />
              </Col>
            </Row>
            <Row>
              <input type="submit" value="Start this task" />
              <button type="button" onClick={toggle_modal}>
                Cancel
              </button>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
