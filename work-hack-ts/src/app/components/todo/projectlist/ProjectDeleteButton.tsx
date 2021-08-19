import React, { useState } from "react";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { deleteProject } from "../../../../database/database_write";
import { project } from "../../../../lib/types";

export default function ProjectDeleteButton(props: {
  project_id: string;
  project: project;
}) {
  const { project_id, project } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const onConfirm = () => {
    deleteProject(project_id);
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
        className="DeleteProjectModal"
        fade={false}
      >
        <ModalHeader>Delete {project.name} </ModalHeader>
        <ModalBody>
          <Row>
            <Col className="d-flex justify-content-center">
              <h4>Are you sure to delete "{project.name}" ?</h4>
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
