import React, { useState } from "react";
import ReactDatetimeClass from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { updateTask } from "../../../../database/database_write";
import { task } from "../../../../lib/types";

type Inputs = {
  name: string;
  point: number;
  deadline: string;
  started_at: any;
  completed_at: any;
};

export default function EditTaskButton(props: {
  project_id: string;
  task_id: string;
  task: task;
}) {
  const { task, project_id, task_id } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const { register, handleSubmit, control } = useForm({
    defaultValues:
      task.completed_at && task.started_at
        ? {
            name: task.name,
            point: task.point,
            deadline: task.deadline,
            started_at: new Date(task.started_at),
            completed_at: new Date(task.completed_at),
          }
        : task.started_at
        ? {
            name: task.name,
            point: task.point,
            deadline: task.deadline,
            started_at: new Date(task.started_at),
          }
        : {
            name: task.name,
            point: task.point,
            deadline: task.deadline,
          },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateTask(project_id, task_id, "name", data.name);
    updateTask(project_id, task_id, "point", data.point);
    updateTask(project_id, task_id, "deadline", data.deadline);
    if (data.started_at) {
      let started_at_date = data.started_at;
      if (data.started_at._d) {
        started_at_date = data.started_at._d;
      }
      updateTask(project_id, task_id, "started_at", started_at_date.getTime());
    }
    if (data.completed_at) {
      let completed_at_date = data.completed_at;
      if (data.completed_at._d) {
        completed_at_date = data.completed_at._d;
      }
      updateTask(project_id, task_id, "completed_at", completed_at_date.getTime());
    }
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
        <ModalHeader>
          Edit
        </ModalHeader>
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
                  {...register("point", { valueAsNumber: true })}
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

            {task.started_at ? (
              <Row className="my-1">
                <Col xs="4" className="d-flex justify-content-end">
                  <label>start time</label>
                </Col>
                <Col>
                  <Controller
                    control={control}
                    name="started_at"
                    render={({ field }) => <ReactDatetimeClass {...field} />}
                  />
                </Col>
              </Row>
            ) : (
              <></>
            )}

            {task.completed_at ? (
              <Row className="my-1">
                <Col xs="4" className="d-flex justify-content-end">
                  <label>complete time</label>
                </Col>
                <Col>
                  <Controller
                    control={control}
                    name="completed_at"
                    render={({ field }) => <ReactDatetimeClass {...field} />}
                  />
                </Col>
              </Row>
            ) : (
              <></>
            )}

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
