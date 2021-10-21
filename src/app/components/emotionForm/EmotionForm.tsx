import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Feeling } from "../../../lib/classes";
import {
  PLEASANT_ENEGY_LABELS,
  PLEASANT_UNENEGY_LABELS,
  UNPLEASANT_ENEGY_LABELS,
  UNPLEASANT_UNENEGY_LABELS,
} from "../../../lib/constants";
import { getColorByFeeling } from "../../../lib/constants";
import HelpLink from "../helpLink/HelpLink";
import EmotionButton from "./EmotionButton";

/**
 * TODO:リファクタリングする
 */
export default function EmotionForm(props: {
  project_id: string;
  task_id: string;
  toggle_modal: () => any;
  start_or_complete: "start" | "complete";
}) {
  const [is_related, setIsRelated] = useState(false);

  const { project_id, task_id, toggle_modal, start_or_complete } = props;

  return (
    <Container fluid style={{ position: "relative" }}>
      
      {start_or_complete === "complete" ? (
        <Row>
          <Col>
            <label>
              <input
                type="checkbox"
                checked={is_related}
                onClick={() => setIsRelated(!is_related)}
              />{" "}
              このタスクによって、今の気持ちになった
            </label>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Row>
        <Col className="text-center">活力あり</Col>
      </Row>
      <Row>
        <div className="d-flex flex-row px-0">
          <div className="d-flex align-items-center">ネガティブ</div>
          <div className="flex-grow-1">
            <Container fluid className="px-0" style={{ position: "relative" }}>
              <div>
                <div
                  style={{
                    height: "2px",
                    width: "100%",
                    backgroundColor: "black",
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    margin: "auto 0",
                  }}
                ></div>
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    margin: "auto 0",
                    right: "1px",
                    WebkitTransform: "rotate(45deg)",
                    transform: "rotate(45deg)",
                    borderTop: "2px solid black",
                    borderRight: "2px solid black",
                  }}
                ></div>
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    margin: "auto 0",
                    left: "1px",
                    WebkitTransform: "rotate(45deg)",
                    transform: "rotate(45deg)",
                    borderLeft: "2px solid black",
                    borderBottom: "2px solid black",
                  }}
                ></div>

                <div
                  style={{
                    height: "100%",
                    width: "2px",
                    backgroundColor: "black",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    margin: "0 auto",
                  }}
                ></div>
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    margin: "0 auto",
                    top: "1px",
                    WebkitTransform: "rotate(45deg)",
                    transform: "rotate(45deg)",
                    borderTop: "2px solid black",
                    borderLeft: "2px solid black",
                  }}
                ></div>
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    margin: "0 auto",
                    bottom: "1px",
                    WebkitTransform: "rotate(45deg)",
                    transform: "rotate(45deg)",
                    borderBottom: "2px solid black",
                    borderRight: "2px solid black",
                  }}
                ></div>
              </div>
              <Row>
                <Col className="pe-0">
                  <EmotionButton
                    project_id={project_id}
                    task_id={task_id}
                    toggle_modal={toggle_modal}
                    start_or_complete={start_or_complete}
                    texts={UNPLEASANT_ENEGY_LABELS}
                    color={getColorByFeeling(new Feeling(10, 0, null))}
                    feeling={
                      new Feeling(
                        10,
                        0,
                        start_or_complete === "start" ? null : is_related
                      )
                    }
                  />
                </Col>
                <Col className="ps-0">
                  <EmotionButton
                    project_id={project_id}
                    task_id={task_id}
                    toggle_modal={toggle_modal}
                    start_or_complete={start_or_complete}
                    texts={PLEASANT_ENEGY_LABELS}
                    color={getColorByFeeling(new Feeling(10, 10, null))}
                    feeling={
                      new Feeling(
                        10,
                        10,
                        start_or_complete === "start" ? null : is_related
                      )
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col className="pe-0">
                  <EmotionButton
                    project_id={project_id}
                    task_id={task_id}
                    toggle_modal={toggle_modal}
                    start_or_complete={start_or_complete}
                    texts={UNPLEASANT_UNENEGY_LABELS}
                    color={getColorByFeeling(new Feeling(0, 0, null))}
                    feeling={
                      new Feeling(
                        0,
                        0,
                        start_or_complete === "start" ? null : is_related
                      )
                    }
                  />
                </Col>
                <Col className="ps-0">
                  <EmotionButton
                    project_id={project_id}
                    task_id={task_id}
                    toggle_modal={toggle_modal}
                    start_or_complete={start_or_complete}
                    texts={PLEASANT_UNENEGY_LABELS}
                    color={getColorByFeeling(new Feeling(0, 10, null))}
                    feeling={
                      new Feeling(
                        0,
                        10,
                        start_or_complete === "start" ? null : is_related
                      )
                    }
                  />
                </Col>
              </Row>
            </Container>
          </div>
          <div className="d-flex align-items-center">ポジティブ</div>
        </div>
      </Row>
      <Row>
        <Col className="text-center">活力なし</Col>
      </Row>
      <div style={{ position: "absolute", right: "0", bottom: "0" }}>
        <HelpLink hyref={"https://www.google.com/"} titleName={"WorkHackにおける感情とは？"}/>
      </div>
    </Container>
  );
}
