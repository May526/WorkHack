import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row } from "reactstrap";
import EmotionForm from "../../common/EmotionForm";

export default function CompletedButton(props: {
  project_id: string;
  task_id: string;
}) {
  const { project_id, task_id } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  return (
    <div>
      <Button size="sm" color="success" onClick={toggle_modal}>
        Complete this task
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle_modal}
        className="CompletedTaskModal"
        fade={false}
      >
        <ModalHeader>Choose your feeling</ModalHeader>
        <ModalBody>
          <EmotionForm
            project_id={project_id}
            task_id={task_id}
            toggle_modal={toggle_modal}
            start_or_complete="complete"
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
