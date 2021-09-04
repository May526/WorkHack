import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Feeling } from "../../../lib/classes";
import { getColorByFeeling } from "../../../lib/no_category";
import EmotionButton from "./EmotionButton";

export default function EmotionForm(props: {
  project_id: string;
  task_id: string;
  toggle_modal: () => any;
  start_or_complete:"start"|"complete"
}) {
  const { project_id, task_id, toggle_modal,start_or_complete } = props;
  return (
    <Container fluid>
      <Row>
        <Col>
          <EmotionButton
            project_id={project_id}
            task_id={task_id}
            toggle_modal={toggle_modal}
            start_or_complete={start_or_complete}

            texts={["ストレス", "緊張", "いらいら"]}
            color={getColorByFeeling(new Feeling(10, 0))}
            feeling={new Feeling(10, 0)}
          />
        </Col>
        <Col>
          <EmotionButton
            project_id={project_id}
            task_id={task_id}
            toggle_modal={toggle_modal}
            start_or_complete={start_or_complete}


            texts={["わくわく", "楽しい", "嬉しい"]}
            color={getColorByFeeling(new Feeling(10, 10))}
            feeling={new Feeling(10, 10)}
          />
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <EmotionButton
            project_id={project_id}
            task_id={task_id}
            toggle_modal={toggle_modal}
            start_or_complete={start_or_complete}

            texts={["疲れた", "退屈", "うんざり"]}
            color={getColorByFeeling(new Feeling(0,0))}
            feeling={new Feeling(0, 0)}
          />
        </Col>
        <Col>
          <EmotionButton
            project_id={project_id}
            task_id={task_id}
            toggle_modal={toggle_modal}
            start_or_complete={start_or_complete}

            texts={["リラックス", "落ち着いている", "癒し"]}
            color={getColorByFeeling(new Feeling(0,10))}
            feeling={new Feeling(0, 10)}
          />
        </Col>
      </Row>
    </Container>
  );
}
