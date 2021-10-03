import React, { useContext } from "react";
import { Container, Row } from "reactstrap";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import ProjectComp from "./projectlist/ProjectComp";
import ProjectForm from "./projectlist/ProjectForm";

export default function ProjectList() {
  const project_ids = useContext(ProjectsContext);
  return (
    <Container>
      {project_ids &&
        project_ids.map((project_id:string, index:number) => {
          return (
            <Row key={index} className="my-3" style={{border:"1px solid #4a9d75"}}>
              <ProjectComp project_id={project_id} />
            </Row>
          );
        })}

      <ProjectForm />
    </Container>
  );
}
