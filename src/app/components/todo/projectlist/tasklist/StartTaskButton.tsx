import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row } from "reactstrap";
import { task } from "../../../../../lib/types";
import EmotionForm from "../../../common/EmotionForm";

export default function StartTaskButton(props: {
  project_id: string;
  task_id: string;
  task: task;
}) {
  const { project_id, task_id, task } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const taskColor = (task: task) => {
    if (task.is_completed) {
      return "success";
    } else if (task.is_ongoing) {
      return "danger";
    } else {
      return "primary";
    }
  };

  const makeButtonLabel = (task: task) => {
    if (task.is_completed) {
      return "Completed";
    } else if (task.is_ongoing) {
      return "Ongoing";
    } else {
      return "Start";
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
        <ModalHeader>"{task.name}"を始める : 現在の気持ちを選ぶ</ModalHeader>
        <ModalBody>
          <EmotionForm
            project_id={project_id}
            task_id={task_id}
            toggle_modal={toggle_modal}
            start_or_complete="start"
          />
          <Row>
            <button type="button" onClick={toggle_modal}>
              Cancel
            </button>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}
