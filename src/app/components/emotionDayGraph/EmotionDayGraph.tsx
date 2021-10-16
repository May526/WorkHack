import React, { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import {
  AreaChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { getColorByFeeling } from "../../../lib/constants";
import {
  get7DaysAgoStartTimestamp,
  getDateLabelFromDate,
  getDatePositionRatio,
  getDayEndTimestamp,
  getDayStartTimestamp,
  getThisMonthStartTimestamp,
  getTodayEndTimestamp,
  getTodayStartTimestamp,
} from "../../../lib/no_category";
import { task } from "../../../lib/types";

export default function EmotionDayGraph(props: { tasks: task[] }) {
  //UIのボタンの状態
  const [range, setRange] = useState<"today" | "week" | "month" | "date">(
    "today"
  );

  // dateの時の曜日の状態
  const [date, setDate] = useState<number>(new Date().getDay());
  const date_order = ["日","月","火","水","木","金","土"]

  // データを取ってくる範囲
  const [old_date, setOldDate] = useState<Date>(getTodayStartTimestamp());
  const latest_date = getTodayEndTimestamp();
 
  const { tasks } = props;
  return (
    <div>
      <Row>
        <Col>
          <div className="d-flex">
            <div className="flex-grow-1">
              {getDateLabelFromDate(old_date) +
                " 00:00" +
                " ~ " +
                getDateLabelFromDate(latest_date) +
                " 00:00"}
              
            </div>
            {range === "date" ? (
                <div>
                  <button onClick={()=>setDate((date+6)%7)}>{"<"}</button>
                  {date_order[date]}曜日
                  <button onClick={()=>setDate((date+1)%7)}>{">"}</button>
                </div>
              ) : (
                <></>
              )}
            <ButtonGroup size="sm">
              <Button
                onClick={() => {
                  setOldDate(getTodayStartTimestamp());
                  setRange("today");
                }}
              >
                日
              </Button>
              <Button
                onClick={() => {
                  setOldDate(get7DaysAgoStartTimestamp());
                  setRange("week");
                }}
              >
                週
              </Button>
              <Button
                onClick={() => {
                  setOldDate(getThisMonthStartTimestamp());
                  setRange("month");
                }}
              >
                月
              </Button>
              <Button
                onClick={() => {
                  setOldDate(getThisMonthStartTimestamp());
                  setRange("date");
                }}
              >
                曜日
              </Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <ResponsiveContainer height={250}>
            <AreaChart>
              {tasks &&
                range === "today" &&
                tasks.map((task) => {
                  if (!task.started_at || !task.completed_at) {
                    return <></>;
                  }

                  const task_start_position = getDatePositionRatio(
                    new Date(task.started_at),
                    latest_date,
                    old_date
                  );
                  if (task_start_position === -1) {
                    return <></>;
                  }

                  const task_complete_position = getDatePositionRatio(
                    new Date(task.completed_at),
                    latest_date,
                    old_date
                  );
                  if (task_complete_position === -1) {
                    return <></>;
                  }

                  return (
                    <ReferenceArea
                      x1={task_start_position}
                      x2={task_complete_position}
                      y1={0}
                      y2={10}
                      strokeWidth={0}
                    />
                  );
                })}

              {tasks &&
                tasks.map((task) => {
                  if (!task.started_at || !task.feelings?.before) {
                    return <></>;
                  }

                  if (task.started_at < old_date.getTime()) {
                    return <></>;
                  }

                  if(range==="date" && (new Date(task.started_at).getDay())!==date){
                      return <></>
                  }

                  const task_start_position = getDatePositionRatio(
                    new Date(task.started_at),
                    getDayEndTimestamp(new Date(task.started_at)),
                    getDayStartTimestamp(new Date(task.started_at))
                  );

                  return (
                    <ReferenceLine
                      x={task_start_position}
                      stroke={getColorByFeeling(task.feelings.before)}
                      strokeWidth={5}
                    />
                  );
                })}

              {tasks &&
                tasks.map((task) => {
                  if (!task.completed_at || !task.feelings?.after) {
                    return <></>;
                  }

                  if (task.completed_at < old_date.getTime()) {
                    return <></>;
                  }
                  if(range==="date" && (new Date(task.completed_at).getDay())!==date){
                    return <></>
                }

                  const task_complete_position = getDatePositionRatio(
                    new Date(task.completed_at),
                    getDayEndTimestamp(new Date(task.completed_at)),
                    getDayStartTimestamp(new Date(task.completed_at))
                  );

                  return (
                    <ReferenceLine
                      key={task.completed_at}
                      x={task_complete_position}
                      stroke={getColorByFeeling(task.feelings.after)}
                      strokeWidth={5}
                    />
                  );
                })}

              {tasks &&
                range === "today" &&
                tasks.map((task) => {
                  if (!task.started_at || !task.completed_at) {
                    return <></>;
                  }

                  const task_start_position = getDatePositionRatio(
                    new Date(task.started_at),
                    latest_date,
                    old_date
                  );
                  if (task_start_position === -1) {
                    return <></>;
                  }

                  const task_complete_position = getDatePositionRatio(
                    new Date(task.completed_at),
                    latest_date,
                    old_date
                  );
                  if (task_complete_position === -1) {
                    return <></>;
                  }

                  return (
                    <ReferenceArea
                      x1={task_start_position}
                      x2={task_complete_position}
                      y1={0}
                      y2={10}
                      strokeWidth={0}
                      fill="#00000000"
                      label={task.name}
                    />
                  );
                })}
              <XAxis dataKey="x" type="number" domain={[0, 100]} tick={false} />
              <YAxis dataKey="y" type="number" domain={[0, 10]} hide />
            </AreaChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </div>
  );
}
