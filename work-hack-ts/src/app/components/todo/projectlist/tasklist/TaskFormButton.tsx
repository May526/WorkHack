import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useRegisterTask } from "../../../../../database/database_write";
import { ProjectsContext } from "../../../../contexts/ProjectsContext";

export default function TaskForm(props:any) {
  const { buttonLabel, className, project_id } = props;

  const { NullTask }:any = useContext(ProjectsContext);

  const [modal, setModal] = useState(false);

  const toggle_modal = () => setModal(!modal);

  const [new_task, setNewTask] = useState(NullTask);

  const registerTask = useRegisterTask(project_id);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    registerTask(new_task);
    setNewTask({...NullTask});
  };

  const handleChange = (event:any) => {
    const copy = {...new_task};
    copy[event.target.name] = event.target.value;
    setNewTask(copy);
  };

  return (
    <div>
      <Button size="sm" color="dark" onClick={toggle_modal}>
        {buttonLabel}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle_modal}
        className={className}
        fade={false}
      >
        <ModalHeader toggle={toggle_modal}>Add a task</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                placeholder="task name"
                name="name"
                value={new_task.name}
                onChange={handleChange}
                invalid={!new_task.name}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                placeholder="point"
                name="point"
                value={new_task.point}
                onChange={handleChange}
                invalid={!new_task.point}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                placeholder="deadline"
                name="deadline"
                value={new_task.deadline}
                onChange={handleChange}
              />
            </FormGroup>

            <Row>
              <Col>
                <Button
                  type="submit"
                  onClick={toggle_modal}
                  disabled={!new_task.name || !new_task.point}
                >
                  Submit
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
