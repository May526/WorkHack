import React from 'react'
import { ReferenceArea, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'

export default function PositiveDateGraph() {
    const data01 = [
        {
          x: 1,
          y: 3.5,
        },
        {
          x: 4,
          y: 4,
        },
        {
          x: 5,
          y: 5,
        },
        {
          x: 7,
          y: 4.5,
        },
      ];
    
      const data02 = [
        {
          x: 2,
          y: 2.0,
        },
        {
          x: 3,
          y: 2.5,
        },
        {
          x: 6,
          y: 5.5,
        },
      ];
    return (
        <ResponsiveContainer height={250}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <XAxis dataKey="x" type="number" tick={false} domain={[0, 8]} />
              <YAxis dataKey="y" type="number" tick={false} domain={[0, 6]} />

              <ReferenceArea
                x1={0}
                y1={3}
                x2={8}
                y2={5}
                stroke="#fff"
                strokeOpacity={0.3}
              />

              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={data01} fill="#000" />
              <Scatter data={data02} fill="#aaaaaa" />
            </ScatterChart>
          </ResponsiveContainer>
    )
}
