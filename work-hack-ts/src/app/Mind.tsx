import React,{useContext,useState,useEffect} from "react";
import { Row } from "reactstrap";
import { AuthContext } from "../auth/AuthProvider";
import { fetchProjects } from "../database/database_read";
import { projects } from "../lib/types";
import MindHistoryGraph from "./components/mind/MindHistoryGraph";
import TasksMindsTable from "./components/mind/TasksMindsTable";


export default function Mind() {
  const currentUser = useContext(AuthContext);
  const [projects, setProjects] = useState<projects>({});
  useEffect(() => {
    fetchProjects(currentUser as firebase.default.User, setProjects);
  }, [currentUser]);

  return (
    <div>
      <Row>
        <div className="d-flex border-bottom">
          <h1 className="h2">Mind History</h1>
        </div>
        <MindHistoryGraph projects={projects} />
      </Row>
      <Row>
        <div className="d-flex border-bottom">
          <h1 className="h2">Completed Tasks</h1>
        </div>
        <TasksMindsTable projects={projects} />
      </Row>
    </div>
  );
}
