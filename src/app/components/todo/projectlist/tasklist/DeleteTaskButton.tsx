import React, { useState } from "react";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { deleteTask } from "../../../../../database/database_write";
import { task, tasks } from "../../../../../lib/types";

export default function DeleteTaskButton(props: {
  project_id: string;
  task_id: string;
  task: task;
  tasks: tasks;
}) {
  const { project_id, task_id, task ,tasks} = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const onConfirm = () => {
    deleteTask(project_id,task_id,tasks);
    toggle_modal();
  };

  return (
    <div>
      <Button size="sm" color="danger" onClick={toggle_modal}>
        Delete
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle_modal}
        className="DeleteTaskModal"
        fade={false}
      >
        <ModalHeader>Delete {task.name} </ModalHeader>
        <ModalBody>
          <Row>
            <Col className="d-flex justify-content-center">
              <h4>Are you sure to delete "{task.name}" ?</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="w-100" color="danger" onClick={onConfirm}>
                confirm
              </Button>
            </Col>
            <Col>
              <Button className="w-100" onClick={toggle_modal}>
                cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}
