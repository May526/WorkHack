import React, { useState, useContext } from "react";
import { Form, Row, Col, FormGroup, Input, Button } from "reactstrap";
import { ProjectsContext } from "../../../contexts/ProjectsContext";
import { useRegisterProject } from "../../../../database/database_write";
import { AuthContext } from "../../../../auth/AuthProvider";


export default function ProjectForm() {
  const { currentUser }:any = useContext(AuthContext) ;
  const { null_project }:any = useContext(ProjectsContext);
  const registerProject = useRegisterProject(currentUser);
  const [new_project, setNewProject] = useState({...null_project});

  const handleSubmit = (event:any) => {
    event.preventDefault();
    registerProject(new_project);
    setNewProject({...null_project});
  };

  const handleChange = (event:any) => {
    let copy = {...new_project};
    copy[event.target.name] = event.target.value;
    setNewProject(copy);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="py-3">
        <Col>
          <FormGroup>
            <Input
              type="text"
              placeholder="project name"
              onChange={handleChange}
              name="name"
              value={new_project.name}
            ></Input>
          </FormGroup>
        </Col>
        <Col xs="2">
          <Button type="submit" color="dark">
            Add a new project
          </Button>
        </Col>
      </Row>
    </Form>
  );
}