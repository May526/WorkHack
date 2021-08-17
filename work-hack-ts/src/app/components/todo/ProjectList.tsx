import React, { useContext } from "react";
import { Container, Row } from "reactstrap";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import ProjectComp from "./projectlist/ProjectComp";
import ProjectForm from "./projectlist/ProjectForm";

export default function ProjectList() {
  const project_ids = useContext(ProjectsContext);
  console.log("render: ProjectList.tsx");
  return (
    <Container>
      {project_ids &&
        project_ids.map((project_id:string, index:number) => {
          return (
            <Row key={index} className="border border-primary my-3">
              <ProjectComp project_id={project_id} />
            </Row>
          );
        })}

      <ProjectForm />
    </Container>
  );
}
