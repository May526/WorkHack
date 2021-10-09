import React from 'react'
import { Button, ButtonGroup, Col, Row } from 'reactstrap';
import { AreaChart, ReferenceArea, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { getColorByFeeling } from '../../../lib/constants';
import { task } from '../../../lib/types';

export default function EmotionTimeGraph(props:{tasks:task[]}) {
    const {tasks}=props;
    return (
        <div>
            <Row>
            <Col>10月8日</Col>
            <Col className="d-flex justify-content-end">
              <ButtonGroup>
                <Button>日</Button>
                <Button>週</Button>
                <Button>月</Button>
                <Button>曜日</Button>
              </ButtonGroup>
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
                      const start_date = new Date(task.started_at);
                      const complete_date = new Date(task.completed_at);

                      return (
                        <ReferenceArea
                          x1={Math.round(
                            ((start_date.getHours() * 60 +
                              start_date.getMinutes()) /
                              (24 * 60)) *
                              100
                          )}
                          x2={Math.round(
                            ((complete_date.getHours() * 60 +
                              complete_date.getMinutes()) /
                              (24 * 60)) *
                              100
                          )}
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
                      const start_date = new Date(task.started_at);
                      return (
                        <ReferenceLine
                          x={Math.round(
                            ((start_date.getHours() * 60 +
                              start_date.getMinutes()) /
                              (24 * 60)) *
                              100
                          )}
                          stroke={getColorByFeeling(task.feelings.before)}
                          strokeWidth={7}
                        />
                      );
                    })}
                    {tasks &&
                    tasks.map((task) => {
                      if (!task.completed_at || !task.feelings?.after) {
                        return <></>;
                      }
                      const complete_date = new Date(task.completed_at);
                      return (
                        <ReferenceLine
                          x={Math.round(
                            ((complete_date.getHours() * 60 +
                              complete_date.getMinutes()) /
                              (24 * 60)) *
                              100
                          )}
                          stroke={getColorByFeeling(task.feelings.after)}
                          strokeWidth={7}
                        />
                      );
                    })}
                    {tasks &&
                    tasks.map((task) => {
                      if (!task.started_at || !task.completed_at) {
                        return <></>;
                      }
                      const start_date = new Date(task.started_at);
                      const complete_date = new Date(task.completed_at);

                      return (
                        <ReferenceArea
                          x1={Math.round(
                            ((start_date.getHours() * 60 +
                              start_date.getMinutes()) /
                              (24 * 60)) *
                              100
                          )}
                          x2={Math.round(
                            ((complete_date.getHours() * 60 +
                              complete_date.getMinutes()) /
                              (24 * 60)) *
                              100
                          )}
                          y1={0}
                          y2={10}
                          strokeWidth={0}
                          fill="#00000000"
                          label={task.name}
                        />
                      );
                    })}
                    <XAxis
                    dataKey="x"
                    type="number"
                    domain={[0, 100]}
                    tick={false}
                  />
                  <YAxis dataKey="y" type="number" domain={[0, 10]} hide />
                </AreaChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </div>
    )
}
