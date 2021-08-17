import React from "react";
import { ResponsiveContainer, Pie, PieChart, Tooltip } from "recharts";
import { task } from "../../../lib/types";

export default function TodayTaskPieChart(props:{task_projectId_taskId:[task: task, project_id: string, task_id: string][]}) {
  const { task_projectId_taskId } = props;
  const tasks=task_projectId_taskId.map(([task,pi,ti])=>{return task});
  const data = tasks.map((task:any) => {
    return {
      name: task.name,
      value: parseInt(task.point,10),
    };
  });
  return (
    <div>
      <ResponsiveContainer height={400} width="100%">
        <PieChart width={730} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={10}
            outerRadius={100}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
