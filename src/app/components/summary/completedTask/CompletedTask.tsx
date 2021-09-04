import { Table } from "reactstrap";
import { msToHMS } from "../../../../lib/convertTypes";
import { extractTasksFromProjects } from "../../../../lib/filters";
import { projects, task } from "../../../../lib/types";

export default function TasksMindsTable(props: { projects: projects }) {
  const { projects } = props;

  const tasks = extractTasksFromProjects(
    projects,
    (task: any) => task.is_completed
  ).map(([task, pi, ti]) => {
    return task;
  });


  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Before (energy, pleasantness) </th>
            <th>After (energy, pleasantness)</th>
            <th>completed at</th>
            <th>elapsed time</th>
            <th>Your time estimate</th>
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
                  <td>
                    ({task.feelings.before.energy},
                    {task.feelings.before.pleasantness})
                  </td>
                  <td>
                    ({task.feelings.after.energy},
                    {task.feelings.after.pleasantness})
                  </td>
                  <td>{new Date(task.completed_at).toLocaleString()}</td>
                  <td>
                    {hms.hour + "h " + hms.minute + "m " + hms.second + "s"}
                  </td>
                  <td>
                    {task.estimated_time ? task.estimated_time + " min" : ""}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
