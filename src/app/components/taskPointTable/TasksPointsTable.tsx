import { Table } from "reactstrap";
import { msToHMS } from "../../../lib/convertTypes";
import { task } from "../../../lib/types";

export default function TasksPointsTable(props: {
  task_projectId_taskId: [task: task, project_id: string, task_id: string][];
}) {
  const { task_projectId_taskId } = props;

  /**
   * 最近に近いほどインデックスが大きいようにソート
   */
  const tasks = task_projectId_taskId.map(([task, pi, ti]) => task);
  tasks.sort((task1: task, task2: task) => {
    return (
      new Date(task1.completed_at as number).getTime() -
      new Date(task2.completed_at as number).getTime()
    );
  });

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Points </th>
            <th>completed at</th>
            <th>elapsed time</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task: task, index: number) => {
              const hms = msToHMS(
                (task.completed_at as number) - (task.started_at as number)
              );
              return (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.point}</td>
                  <td>{new Date(task.completed_at as number).toLocaleTimeString()}</td>
                  <td>
                    {hms.hour + "h " + hms.minute + "m " + hms.second + "s"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
