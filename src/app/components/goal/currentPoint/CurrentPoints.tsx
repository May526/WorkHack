import { task } from "../../../../lib/types";

export default function CurrentPoints(props: {
  task_projectId_taskId: [task: task, project_id: string, task_id: string][];
}) {
  const { task_projectId_taskId } = props;

  const today_sum = task_projectId_taskId
    .map(([task, pi, ti]) => typeof(task.point) === "string" ? parseInt(task.point, 10) : task.point)
    .reduce((sum: number, point: number) => sum + point, 0);

  return (
    <div>
      <h3>Current : {today_sum} [pts]</h3>
    </div>
  );
}
