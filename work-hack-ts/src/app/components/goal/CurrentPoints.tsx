import React from "react";
import { task } from "../../../lib/types";

export default function CurrentPoints(props:{task_projectId_taskId:[task: task, project_id: string, task_id: string][]}){
  const { task_projectId_taskId } = props;
  let sum=0;
  task_projectId_taskId.map(([task,pi,ti])=>task).map((task)=>{sum+=parseInt(task.point,10); return null})

  return (
    <div>
      <h3>Current :  {sum} [pts]</h3>
    </div>
  );
}
