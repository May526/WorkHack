import { useContext, useState, useEffect } from "react";
import "./Mind.css";
import { AuthContext } from "../../../auth/AuthProvider";
import { fetchProjects } from "../../../database/database_read";
import { projects } from "../../../lib/types";
import TasksMindsTable from "../../components/summary/completedTask/CompletedTask";
import TimeFeelingTable from "../../components/summary/TimeFeelingTable";

export default function Mind() {
  const {currentUser} = useContext(AuthContext);
  const [projects, setProjects] = useState<projects>({});
  useEffect(() => {
    fetchProjects(currentUser as firebase.default.User, setProjects);
  }, [currentUser]);

  return (
    <div className="summary">
      <div className="summaryTasks">
        <h2>Time - Feeling Table</h2>
        <TimeFeelingTable projects={projects} />
      </div>
      <div className="summaryTasks">
        <h2 className="summaryTitle">Completed Tasks</h2>
        <TasksMindsTable projects={projects} />
      </div>
    </div>
  );
}
