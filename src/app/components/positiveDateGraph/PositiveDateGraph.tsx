import React from "react";
import {
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { UNPLEASANT_PLEASANT_IDEAL_RATIO_LOWER_LIMIT } from "../../../lib/constants";

export default function PositiveDateGraph(props: {
  positive_negative_ratios: number[];
}) {
  const { positive_negative_ratios } = props;
  const LOWER_LIMIT = UNPLEASANT_PLEASANT_IDEAL_RATIO_LOWER_LIMIT[1]/UNPLEASANT_PLEASANT_IDEAL_RATIO_LOWER_LIMIT[0]

  const ratios_for_graph = positive_negative_ratios.map((ratio,index) => {
    return {days_ago:index,pn:ratio}
  }).filter(({pn})=>pn!==-1);
  
  const inside = ratios_for_graph.filter(({pn}) => {
    return  LOWER_LIMIT <= pn && pn <= 5.0
  });

  const outside = ratios_for_graph.filter(({pn}) => {
    return  pn < LOWER_LIMIT || 5.0 < pn
  });

  return (
    <ResponsiveContainer height={250}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <XAxis dataKey="days_ago" type="number" tick={false} domain={[0, 6]} />
        <YAxis dataKey="pn" type="number" tick={false} domain={[0, 6]} hide />

        <ReferenceArea
          x1={0}
          y1={3}
          x2={6}
          y2={5}
          stroke="#fff"
          strokeOpacity={0.3}
        />

        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={inside} fill="#000" />
        <Scatter data={outside} fill="#aaaaaa" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
