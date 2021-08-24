import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { updateProject } from "../../../../database/database_write";
import { project } from "../../../../lib/types";

type ProjectEditInput = {
  name: string;
};

export default function ProjectEditButton(props: {
  project_id: string;
  project: project;
}) {
  const { project_id, project } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const { register, handleSubmit } = useForm({
    defaultValues: { name: project.name },
  });

  const onSubmit: SubmitHandler<ProjectEditInput> = (data) => {
    updateProject(project_id, "name", data.name);
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
        className="EditProjectModal"
        fade={false}
      >
        <ModalHeader>Edit : {project.name} </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="my-1">
              <Col xs="4" className="d-flex justify-content-end">
                <label htmlFor={`${project_id}name`}>project name</label>
              </Col>
              <Col>
                <input
                  className="w-100"
                  id={`${project_id}name`}
                  type="text"
                  {...register("name")}
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
