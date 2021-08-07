import React from "react";
import { Table } from "reactstrap";

export default function TasksPointsTable(props:any) {
  const {tasks} = props;

  /**
   * 最近に近いほどインデックスが大きい
   */
  tasks.sort((task1:any, task2:any) => {
    return new Date(task1.completed_at).getTime()- new Date(task2.completed_at).getTime()
  });

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Points </th>
            <th>completed at</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task:any, index:any) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{task.name}</td>
                  <td>
                    {task.point}
                  </td>
                  <td>{new Date(task.completed_at).toLocaleString()}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
