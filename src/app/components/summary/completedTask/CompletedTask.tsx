import { Table } from "reactstrap";
import { extractTasksFromProjects } from "../../../../lib/filters";
import { getColorByFeeling, getPassedTime } from "../../../../lib/no_category";
import { feeling, projects, task } from "../../../../lib/types";

export default function TasksMindsTable(props: { projects: projects }) {
  const { projects } = props;

  const tasks = extractTasksFromProjects(
    projects,
    (task: any) => task.is_completed
  ).map(([task, pi, ti]) => {
    return task;
  });

  tasks.sort(
    (task1: task, task2: task) =>
      (task2.completed_at as number) - (task1.completed_at as number)
  );

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Before </th>
            <th>After </th>
            <th>start at</th>
            <th>complete at</th>
            <th>passed time</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task: task, index: number) => {
              return (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td
                    style={{
                      background: getColorByFeeling(
                        (task.feelings as { before: feeling; after: feeling })
                          .before
                      ),
                    }}
                  ></td>
                  <td
                    style={{
                      background: getColorByFeeling(
                        (task.feelings as { before: feeling; after: feeling })
                          .after
                      ),
                    }}
                  ></td>
                  <td>
                    {new Date(task.started_at as number).toLocaleString()}
                  </td>
                  <td>
                    {new Date(task.completed_at as number).toLocaleString()}
                  </td>

                  <td>
                    {getPassedTime(task)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
