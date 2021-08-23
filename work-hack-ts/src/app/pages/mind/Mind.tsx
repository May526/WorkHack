import { useContext, useState, useEffect } from "react";
import "./Mind.css";
import { AuthContext } from "../../../auth/AuthProvider";
import { fetchProjects } from "../../../database/database_read";
import { projects } from "../../../lib/types";
import MindHistoryGraph from "../../components/mindHistory/MindHistoryGraph";
import TasksMindsTable from "../../components/completedTask/CompletedTask";

export default function Mind() {
  const currentUser = useContext(AuthContext);
  const [projects, setProjects] = useState<projects>({});
  useEffect(() => {
    fetchProjects(currentUser as firebase.default.User, setProjects);
  }, [currentUser]);

  return (
    <div className="summary">
      <div className="summaryHistory">
        <h2 className="summaryTitle">Mind History</h2>
        <MindHistoryGraph projects={projects} />
      </div>
      <div className="summaryTasks">
        <h2 className="summaryTitle">Completed Tasks</h2>
        <TasksMindsTable projects={projects} />
      </div>
    </div>
  );
}
