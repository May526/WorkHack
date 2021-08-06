import React, { useContext, useMemo } from "react";
import { Row, Col } from "reactstrap";
import CurrentPoints from "./components/goal/CurrentPoints";
import GoalPoints from "./components/goal/GoalPoints";
import TasksPointsTable from "./components/goal/TasksPointsTable";
import TodayTaskPieChart from "./components/goal/TodayTaskPieChart";
import { ProjectsContext } from "./contexts/ProjectsContext";

export default function Goal() {
  const { extractTasksFromProjects } = useContext(ProjectsContext);
  const tasks_completed_today = useMemo(()=>
  extractTasksFromProjects((task) => {
    const now_timestamp = new Date();
    return (
      task.is_completed &&
      new Date(task.completed_at).getDate() === now_timestamp.getDate()
    );
  }),[extractTasksFromProjects]);
  return (
    <div>
      <Row className="my-4">
        <Col>
          <CurrentPoints tasks={tasks_completed_today} />
        </Col>
        <Col>
          <GoalPoints />
        </Col>
      </Row>
      <Row className="my-4">
        <Col xs="4">
          <TodayTaskPieChart tasks={tasks_completed_today} />
        </Col>
        <Col>
          <TasksPointsTable tasks={tasks_completed_today} />
        </Col>
      </Row>
    </div>
  );
}
