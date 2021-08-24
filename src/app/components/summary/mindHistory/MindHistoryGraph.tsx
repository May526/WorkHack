import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { extractTasksFromProjects } from "../../../../lib/filters";
import { projects, task } from "../../../../lib/types";

export default function MindHistoryGraph(props: { projects: projects }) {
  const { projects } = props;

  const started_tasks = extractTasksFromProjects(projects, (task: task) => {
    return task.is_ongoing || task.is_completed;
  });

  /**
   * LineChartに渡せる形に整形
   */
  const start_feelings = started_tasks.map(([task, project_id, task_id]) => {
    return {
      timestamp: new Date(task.started_at).getTime(),
      timestamp_str: new Date(task.started_at).toLocaleString(),
      energy: task.feelings.before.energy,
      pleasantness: task.feelings.before.pleasantness,
    };
  });

  const completed_tasks = extractTasksFromProjects(
    projects,
    (task: task) => task.is_completed
  );

  /**
   * LineChartに渡せる形に整形
   */
  const end_feelings = completed_tasks.map(([task, project_id, task_id]) => {
    return {
      timestamp: new Date(task.completed_at).getTime(),
      timestamp_str: new Date(task.completed_at).toLocaleString(),
      energy: task.feelings.after.energy,
      pleasantness: task.feelings.after.pleasantness,
    };
  });

  const feelings = start_feelings.concat(end_feelings);
  /**
   * 最近であるほどインデックスが小さくなるようにソート
   */
  feelings.sort((feeling1: any, feeling2: any) => {
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
