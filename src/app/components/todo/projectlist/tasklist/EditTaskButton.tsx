import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { updateTask } from "../../../../../database/database_write";
import { task } from "../../../../../lib/types";

export default function EditTaskButton(props: {
  project_id: string;
  task_id: string;
  task: task;
}) {
  const { task, project_id, task_id } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const { register, handleSubmit } = useForm({ defaultValues: task });

  const onSubmit: SubmitHandler<task> = (data) => {
    updateTask(project_id, task_id, "name", data.name);
    updateTask(project_id, task_id, "point", data.point);
    updateTask(project_id, task_id, "deadline", data.deadline);
    updateTask(project_id, task_id, "estimated_time", data.estimated_time);
    toggle_modal();
  };

  return (
    <div>
      <Button size="sm" color="white" onClick={toggle_modal}>
        Edit
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle_modal}
        className="EditTaskModal"
        fade={false}
      >
        <ModalHeader>Edit</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="my-1">
              <Col xs="4" className="d-flex justify-content-end">
                <label htmlFor={`${project_id}${task_id}name`}>task name</label>
              </Col>
              <Col>
                <input
                  className="w-100"
                  id={`${project_id}${task_id}name`}
                  type="text"
                  {...register("name")}
                />
              </Col>
            </Row>
            <Row className="my-1">
              <Col xs="4" className="d-flex justify-content-end">
                <label htmlFor={`${project_id}${task_id}point`}>point</label>
              </Col>
              <Col>
                <input
                  className="w-100"
                  id={`${project_id}${task_id}point`}
                  type="number"
                  {...register("point")}
                />
              </Col>
            </Row>
            <Row className="my-1">
              <Col xs="4" className="d-flex justify-content-end">
                <label htmlFor={`${project_id}${task_id}deadline`}>
                  deadline
                </label>
              </Col>
              <Col>
                <input
                  className="w-100"
                  id={`${project_id}${task_id}deadline`}
                  type="text"
                  {...register("deadline")}
                />
              </Col>
            </Row>
            <Row className="my-1">
              <Col xs="5" className="d-flex justify-content-end">
                <label htmlFor={`${project_id}${task_id}estimated_time`}>
                  estimated time [min]
                </label>
              </Col>
              <Col>
                <input
                  className="w-100"
                  id={`${project_id}${task_id}estimated_time`}
                  type="text"
                  {...register("estimated_time")}
                />
              </Col>
            </Row>
            <Row>
              <input type="submit" value="submit" />
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
