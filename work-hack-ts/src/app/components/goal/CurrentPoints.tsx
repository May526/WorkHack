import React from "react";

export default function CurrentPoints(props:any) {
  const { tasks } = props;
  let sum=0;
  tasks.map((task:any)=>{sum+=parseInt(task.point,10); return null})

  return (
    <div>
      <h3>Current :  {sum} [pts]</h3>
    </div>
  );
}
