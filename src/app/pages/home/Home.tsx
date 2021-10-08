import { Button, ButtonGroup, Col, Container, Row } from "reactstrap";
import {
  AreaChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Task } from "../../../lib/classes";
import { getColorByFeeling } from "../../../lib/constants";

function Home() {
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

  const tasks = [
    new Task("task 1", 0, "", Date.now() - 1000 * 60 * 60 * 3, Date.now(), {
      before: { pleasantness: 10, energy: 10, is_related_with_task: null },
      after: { pleasantness: 0, energy: 0, is_related_with_task: null },
    })
  ];

  return (
    <Container fluid>
      <Row>
        <Col>
          <Container className="my-3">
            <Row>
              <Col style={{ backgroundColor: "#b5e61d66" }}>
                <p>〇〇さん、今日もお疲れ様です。</p>
                <p>
                  昨日は わくわく/楽しい/嬉しい
                  の感情が多く、ポジティブに過ごせた ようですね。
                </p>
                <p>
                  ○○さんは最近、 朝 に イライラ/緊張/ストレス
                  を感じることが多いようです。
                </p>
                <p>
                  「イライラしてしまっているな」と感じているのに気付いた
                  ときは、10秒だけでも深呼吸 してみてはいかがでしょう？
                </p>
                <p>少しの行動で気持ちは前向きになっていきますよ。</p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>○○さんの気持ち</h4>
        </Col>
      </Row>
      <Row className="mx-3 row-cols-2">
        <Col>
          <div>日々のポジティブ度合い</div>
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
        </Col>
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
