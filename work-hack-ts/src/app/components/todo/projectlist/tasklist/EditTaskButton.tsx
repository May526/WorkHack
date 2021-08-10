import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

export default function EditTaskButton(props:any) {
  const {task}=props;
  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);
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
          <Form>
            <Row>
              <Col>
                <Label>task name</Label>
                <Input type="text" value={task.name} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>point</Label>
                <Input type="text" value={task.point} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>deadline</Label>
                <Input type="text" value={task.deadline} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>estimated time</Label>
                <Input type="text" value={task.estimated_time} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit" color="primary" onClick={toggle_modal}>
                  Reflect
                </Button>
              </Col>
              <Col className="d-flex justify-content-end">
              <Button color="danger" onClick={toggle_modal}>
                  delete this task
                </Button>
                <Button onClick={toggle_modal}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
