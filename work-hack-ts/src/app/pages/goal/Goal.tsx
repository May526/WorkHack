import React, { useContext, useEffect, useMemo, useState } from "react";
import { Row, Col } from "reactstrap";
import { AuthContext } from "../../../auth/AuthProvider";
import { fetchProjects } from "../../../database/database_read";
import { extractTasksFromProjects } from "../../../lib/filters";
import { projects, task } from "../../../lib/types";
import CurrentPoints from "../../components/goal/currentPoint/CurrentPoints";
import GoalPoints from "../../components/goal/goalPoint/GoalPoints";
import TasksPointsTable from "../../components/taskPointTable/TasksPointsTable";
import TodayTaskPieChart from "../../components/goal/todayTaskPieChart/TodayTaskPieChart";

export default function Goal() {
  const currentUser = useContext(AuthContext);
  const [projects, setProjects] = useState<projects>({});
  useEffect(() => {
    fetchProjects(currentUser as firebase.default.User, setProjects);
  }, [currentUser]);

  const tasks_completed_today = useMemo(
    () =>
      extractTasksFromProjects(projects, (task: task) => {
        const now_timestamp = new Date();
        return (
          task.is_completed &&
          new Date(task.completed_at).getDate() === now_timestamp.getDate()
        );
      }),
    [projects]
  );
  return (
    <div>
      <Row className="my-4">
        <Col>
          <CurrentPoints task_projectId_taskId={tasks_completed_today} />
        </Col>
        <Col><GoalPoints projects={projects} /></Col>
      </Row>
      <Row className="my-4">
        <Col xs="4">
          <TodayTaskPieChart task_projectId_taskId={tasks_completed_today} />
        </Col>
        <Col><TasksPointsTable task_projectId_taskId={tasks_completed_today} /></Col>
      </Row>
    </div>
  );
}
