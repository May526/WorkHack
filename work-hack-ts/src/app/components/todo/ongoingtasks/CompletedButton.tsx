import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";
import { useSetTask } from "../../../../database/database_write";
import { ProjectsContext } from "../../../contexts/ProjectsContext";

export default function CompletedButton(props: any) {
  const { project_id, task } = props;
  const setTask = useSetTask(project_id, task.task_id);

  const { NullFeeling }: any = useContext(ProjectsContext);

  const [modal, setModal] = useState(false);

  const [new_feeling, setNewFeeling] = useState(NullFeeling);

  const toggle_modal = () => setModal(!modal);

  const handleChange = (event: any) => {
    let copy = { ...new_feeling };
    copy[event.target.name] = event.target.value;
    setNewFeeling(copy);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let copy = { ...task };
    copy["is_completed"] = true;
    copy["is_ongoing"] = false;
    copy["task_id"] = null;
    copy.feeling.after = new_feeling;
    copy.completed_at = Date.now();
    setTask(copy);
  };

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
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Label>Pleasantness : {new_feeling.pleasantness}</Label>
                <Input
                  className="w-100"
                  type="range"
                  max="10"
                  min="1"
                  step="1"
                  name="pleasantness"
                  value={new_feeling.pleasantness}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Energy : {new_feeling.energy}</Label>
                <Input
                  className="w-100"
                  type="range"
                  max="10"
                  min="1"
                  step="1"
                  name="energy"
                  value={new_feeling.energy}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit" color="success" onClick={toggle_modal}>
                  Complete this task !
                </Button>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button onClick={toggle_modal}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
