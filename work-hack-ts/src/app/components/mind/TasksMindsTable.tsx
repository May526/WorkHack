import React,{useContext} from "react";
import { Table } from "reactstrap";
import { msToHMS } from "../../../lib/convertTypes";
import { ProjectsContext } from "../../contexts/ProjectsContext";

export default function TasksMindsTable() {
  const { extractTasksFromProjects }:any = useContext(ProjectsContext);
  const tasks = extractTasksFromProjects((task:any) => task.is_completed);

  /**
   * 差のノルムでソート
   * ノルムが等しい場合は初期値のノルムで比較
   * さらに等しい場合は等しい扱い
   */
  tasks.sort((task1:any, task2:any) => {
    function norm(vector:number[]) {
      let ret = 0;
      for (let i = 0; i < vector.length; i++) {
        ret += vector[i] ** 2;
      }
      return ret;
    }

    function diff(vector1:number[], vector2:number[]) {
      let ret = [];
      for (let i = 0; i < vector1.length; i++) {
        ret.push(vector1[i] - vector2[i]);
      }

      return ret;
    }
    const t1_before = [
      task1.feeling.before.energy,
      task1.feeling.before.pleasantness,
    ];
    const t1_after = [
      task1.feeling.after.energy,
      task1.feeling.after.pleasantness,
    ];
    const t2_before = [
      task2.feeling.before.energy,
      task2.feeling.before.pleasantness,
    ];
    const t2_after = [
      task2.feeling.after.energy,
      task2.feeling.after.pleasantness,
    ];
    const t1_diff_norm = norm(diff(t1_after, t1_before));
    const t2_diff_norm = norm(diff(t2_after, t2_before));
    if (t1_diff_norm > t2_diff_norm) {
      return -1;
    } else if (t1_diff_norm < t2_diff_norm) {
      return 1;
    } else {
      if (norm(t1_before) > norm(t2_before)) {
        return -1;
      } else {
        return 1;
      }
    }
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
            tasks.map((task:any, index:number) => {
              const hms=msToHMS(task.completed_at-task.started_at)
              return (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>
                    ({task.feeling.before.energy},
                    {task.feeling.before.pleasantness})
                  </td>
                  <td>
                    ({task.feeling.after.energy},
                    {task.feeling.after.pleasantness})
                  </td>
                  <td>{new Date(task.completed_at).toLocaleString()}</td>
                  <td>
                    {hms.hour+"h "+hms.minute+"m "+hms.second+"s"}
                  </td>
                  <td>
                    {task.estimated_time ? task.estimated_time+" min" : ""} 
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
