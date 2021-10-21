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
  getThisMonthStartTimestamp,
  getTodayEndTimestamp,
  getTodayStartTimestamp,
} from "../../../lib/no_category";
import { task } from "../../../lib/types";

export default function EmotionTimeGraph(props: { tasks: task[] }) {
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
                " 24:00"}
            </div>
            <ButtonGroup size="sm">
              <Button onClick={() => setOldDate(getTodayStartTimestamp())}>
                日
              </Button>
              <Button onClick={() => setOldDate(get7DaysAgoStartTimestamp())}>
                週
              </Button>
              <Button onClick={() => setOldDate(getThisMonthStartTimestamp())}>
                月
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

                  const task_start_position = getDatePositionRatio(
                    new Date(task.started_at),
                    latest_date,
                    old_date
                  );
                  if (task_start_position === -1) {
                    return <></>;
                  }

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

                  const task_complete_position = getDatePositionRatio(
                    new Date(task.completed_at),
                    latest_date,
                    old_date
                  );
                  if (task_complete_position === -1) {
                    return <></>;
                  }

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
