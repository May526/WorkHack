import React from "react";
import { extractTasksFromProjects } from "../../../lib/filters";
import { projects, task } from "../../../lib/types";

/**
 * 過去7日間の取得pointの総和を7で割った値を今日のgoalとしている 
 * 　S:過去7日間の取得pointの総和 とすれば
 * 　S/7 : 過去7日間をもとにした1日の平均取得ポイント となる
 */
export default function GoalPoints(props: { projects: projects }) {
  const { projects } = props;

  const task_projectId_taskId = extractTasksFromProjects(
    projects,
    (task: any) => {
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
    }
  );

  const tasks_in_last_7_day = task_projectId_taskId.map(([task, pi, ti]) => {
    return task;
  });

  const goal_int = tasks_in_last_7_day.length
    ? tasks_in_last_7_day
        .map((task: task) => parseInt(task.point, 10))
        .reduce((point_int: number, sum: number) => sum + point_int,0) / 7
    : 0;

  return (
    <div>
      <h3>Goal : {goal_int} [pts]</h3>
    </div>
  );
}
