import React, { useContext } from "react";
import { Container, Row } from "reactstrap";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import Project from "./projectlist/Project";
import ProjectForm from "./projectlist/ProjectForm";

export default function ProjectList() {
  const { projects } = useContext(ProjectsContext);
  return (
    <Container>
      {projects &&
        projects.map((project, index) => {
          return (
            <Row key={index} className="border my-3">
              <Project project={project} />
            </Row>
          );
        })}

      <ProjectForm />
    </Container>
  );
}
