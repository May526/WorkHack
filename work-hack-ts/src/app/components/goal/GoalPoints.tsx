import React,{useContext} from "react";
import { ProjectsContext } from "../../contexts/ProjectsContext";


export default function GoalPoints() {
  const { extractTasksFromProjects }:any = useContext(ProjectsContext);
  const tasks_in_last_7_day = extractTasksFromProjects((task:any) => {
    const now_timestamp = new Date();
    const latest_timestamp = new Date(now_timestamp.toLocaleDateString());
    const oldest_timestamp = new Date(
      latest_timestamp.getTime() - 1000 * 60 * 60 * 24 * 7
    );
    return (
      task.is_completed &&
      latest_timestamp.getTime() >= new Date(task.completed_at).getTime() &&
      new Date(task.completed_at).getTime() >= oldest_timestamp.getTime()
    );
  });

  const goal_int = tasks_in_last_7_day.length
    ? tasks_in_last_7_day
    .map((task:any)=>typeof(task.point)==='string'? parseInt(task.point, 10) : task.point)
    .reduce((point_int:any, sum:any) => 
        sum + parseInt(point_int, 10)
      ) /7     : 0;
  return (
    <div>
      <h3>Goal : {goal_int} [pts]</h3>
    </div>
  );
}
