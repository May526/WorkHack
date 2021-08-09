import React from "react";
import { task } from "../../../lib/types";

export default function CurrentPoints(props:any){
  const { tasks }:{tasks:task[]} = props;
  let sum=0;
  tasks.map((task)=>{sum+=parseInt(task.point,10); return null})

  return (
    <div>
      <h3>Current :  {sum} [pts]</h3>
    </div>
  );
}
