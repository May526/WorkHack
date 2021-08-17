import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { registerProject } from "../../../../database/database_write";
import { AuthContext } from "../../../../auth/AuthProvider";
import { Project } from "../../../../lib/classes";
import { useForm, SubmitHandler } from "react-hook-form";

type ProjectInput = {
  name: string;
};

export default function ProjectForm() {
  const currentUser = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<ProjectInput> = (inputs) => {
    const new_project = new Project(currentUser as firebase.default.User);
    new_project.name = inputs.name;
    registerProject(currentUser as firebase.default.User, new_project);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <input {...register("name", { required: true }) } className="w-100"/>
          {errors.name && <span>This field is required.</span>}
        </Col>
        <Col className="d-flex justify-content-end" xs="2">
          <input type="submit" value="add a new project" />
        </Col>
      </Row>
    </form>
  );
}
