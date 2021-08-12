import React from "react";
import { Table } from "reactstrap";
import { msToHMS } from "../../../lib/convertTypes";

export default function TasksPointsTable(props: any) {
  const { tasks } = props;

  /**
   * 最近に近いほどインデックスが大きい
   */
  tasks.sort((task1: any, task2: any) => {
    return (
      new Date(task1.completed_at).getTime() -
      new Date(task2.completed_at).getTime()
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
            tasks.map((task: any, index: any) => {
              const hms = msToHMS(task.completed_at - task.started_at);
              return (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.point}</td>
                  <td>{new Date(task.completed_at).toLocaleString()}</td>
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
