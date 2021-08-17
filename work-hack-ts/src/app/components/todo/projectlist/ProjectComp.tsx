import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { AuthContext } from "../../../../auth/AuthProvider";
import { fetchProject_on } from "../../../../database/database_read";
import { Project } from "../../../../lib/classes";
import TaskList from "./TaskList";

export default function ProjectComp(props:{project_id:string}) {
  const currentUser = useContext(AuthContext);
  const { project_id } = props;
  const [project,setProject] = useState(new Project(currentUser as firebase.default.User))
  useEffect(()=>{
    fetchProject_on(project_id,setProject);
  },[project_id])
  console.log("render: Project.tsx",project_id);
  // console.log("project:",project);
  return (
    <div>
      <Row>
        <h2>{project.name}</h2>
      </Row>
      <Row>
        <Col>
          <TaskList
            tasks={project.tasks}
            project_id={project_id}
          />
        </Col>
      </Row>
    </div>
  );
}