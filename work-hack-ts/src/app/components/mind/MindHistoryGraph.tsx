import React, { useContext } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ProjectsContext } from "../../contexts/ProjectsContext";

export default function MindHistoryGraph() {
  const { extractTasksFromProjects }:any = useContext(ProjectsContext);

  const started_tasks = extractTasksFromProjects((task:any) => {
    return task.is_ongoing || task.is_completed;
  })

  const start_feelings = started_tasks.map((task:any) => {
    return {
      timestamp: new Date(task.started_at).getTime(),
      timestamp_str: new Date(task.started_at).toLocaleString(),
      energy: task.feeling.before.energy,
      pleasantness: task.feeling.before.pleasantness,
    };
  });

  const completed_tasks = extractTasksFromProjects(
    (task:any) => task.is_completed
  )
  const end_feelings = completed_tasks.map((task:any) => {
    return {
      timestamp: new Date(task.completed_at).getTime(),
      timestamp_str: new Date(task.completed_at).toLocaleString(),
      energy: task.feeling.after.energy,
      pleasantness: task.feeling.after.pleasantness,
    };
  });

  const feelings = start_feelings.concat(end_feelings);
  /**
   * 最近であるほどインデックスが小さくなるようにソート
   */
  feelings.sort((feeling1:any, feeling2:any) => {
    return feeling1.timestamp - feeling2.timestamp;
  });

  return (
    <div className="m-1 border">
      <ResponsiveContainer width="95%" height={200}>
        <LineChart data={feelings}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp_str" />
          <YAxis hide type="number" domain={[1, 10]} />
          <Legend />
          <Line type="monotone" dataKey="energy" stroke="#8884d8" />
          <Line type="monotone" dataKey="pleasantness" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
