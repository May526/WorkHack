import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { registerTask } from "../../../../../database/database_write";
import { Task } from "../../../../../lib/classes";

type TaskInput = {
  name: string;
  point: string;
  deadline: string;
  estimated_time: number | "";
};

export default function TaskForm(props: { project_id: string ,parent_task_id:string}) {
  const { project_id , parent_task_id} = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", point: "", deadline: "", estimated_time: "" ,parent:parent_task_id},
  });

  const onSubmit: SubmitHandler<TaskInput> = (inputs, event) => {
    const new_task = new Task();
    Object.assign(new_task, inputs);
    registerTask(project_id, new_task);
    reset();
    toggle_modal();
  };

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
        <ModalHeader toggle={toggle_modal}>Add a task</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="my-1">
              <Col xs="4" className="d-flex justify-content-end">
                <label htmlFor={`${project_id}name`}>task name</label>
              </Col>
              <Col>
                <input
                  className="w-100"
                  id={`${project_id}name`}
                  type="text"
                  {...register("name", { required: true })}
                />
              </Col>
            </Row>
            <Row className="my-1">
              <Col xs="4" className="d-flex justify-content-end">
                <label htmlFor={`${project_id}point`}>point</label>
              </Col>
              <Col>
                <input
                  className="w-100"
                  id={`${project_id}point`}
                  type="number"
                  {...register("point", { required: true })}
                />
              </Col>
            </Row>
            <Row className="my-1">
            <Col xs="4" className="d-flex justify-content-end">
                <label htmlFor={`${project_id}deadline`}>deadline</label>
              </Col>
              <Col>
                <input
                  className="w-100"
                  id={`${project_id}deadline`}
                  type="text"
                  {...register("deadline")}
                />
              </Col>
            </Row>
            <Row className="my-1">
            <Col xs="5" className="d-flex justify-content-end">
                <label htmlFor={`${project_id}estimated_time`}>estimated time [min]</label>
              </Col>
              <Col>
                <input
                  className="w-100"
                  id={`${project_id}estimated_time`}
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
