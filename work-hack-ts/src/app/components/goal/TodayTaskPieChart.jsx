import React from "react";
import { ResponsiveContainer, Pie, PieChart, Tooltip } from "recharts";

export default function TodayTaskPieChart(props) {
  const { tasks } = props;
  const data = tasks.map((task) => {
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
