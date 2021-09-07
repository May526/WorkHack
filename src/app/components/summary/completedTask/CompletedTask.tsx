import { Table } from "reactstrap";
import { msToHMS } from "../../../../lib/convertTypes";
import { extractTasksFromProjects } from "../../../../lib/filters";
import { getColorByFeeling } from "../../../../lib/no_category";
import { feeling, projects, task } from "../../../../lib/types";

export default function TasksMindsTable(props: { projects: projects }) {
  const { projects } = props;

  const tasks = extractTasksFromProjects(
    projects,
    (task: any) => task.is_completed
  ).map(([task, pi, ti]) => {
    return task;
  });

  tasks.sort((task1:task,task2:task)=>(task2.completed_at as number) - (task1.completed_at as number))

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Before </th>
            <th>After </th>
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
                  <td
                    style={{
                      background: getColorByFeeling((task.feelings as {before:feeling,after:feeling}).before ),
                    }}
                  ></td>
                  <td
                    style={{
                      background: getColorByFeeling((task.feelings as {before:feeling,after:feeling}).after),
                    }}
                  ></td>
                  <td>{new Date(task.completed_at as number).toLocaleString()}</td>
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
