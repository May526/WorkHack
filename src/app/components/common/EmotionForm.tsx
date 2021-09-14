import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Feeling } from "../../../lib/classes";
import { getColorByFeeling } from "../../../lib/no_category";
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

  const [is_related,setIsRelated] = useState(false);

  const { project_id, task_id, toggle_modal, start_or_complete } = props;

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
            color={getColorByFeeling(new Feeling(10, 0,null))}
            feeling={new Feeling(10, 0,start_or_complete==="start"?null:is_related)}
          />
        </Col>
        <Col>
          <EmotionButton
            project_id={project_id}
            task_id={task_id}
            toggle_modal={toggle_modal}
            start_or_complete={start_or_complete}
            texts={["わくわく", "楽しい", "嬉しい"]}
            color={getColorByFeeling(new Feeling(10, 10,null))}
            feeling={new Feeling(10, 10,start_or_complete==="start"?null:is_related)}
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
            color={getColorByFeeling(new Feeling(0, 0,null))}
            feeling={new Feeling(0, 0,start_or_complete==="start"?null:is_related)}
          />
        </Col>
        <Col>
          <EmotionButton
            project_id={project_id}
            task_id={task_id}
            toggle_modal={toggle_modal}
            start_or_complete={start_or_complete}
            texts={["リラックス", "落ち着いている", "癒し"]}
            color={getColorByFeeling(new Feeling(0, 10,null))}
            feeling={new Feeling(0, 10,start_or_complete==="start"?null:is_related)}
          />
        </Col>
      </Row>
      {start_or_complete==="complete" ?(<Row>
        <Col>
          <label>
            <input type="checkbox" checked={is_related} onClick={()=>setIsRelated(!is_related)}/>このタスクによって、今の気持ちになった
          </label>
        </Col>
      </Row>):(<></>)}
      
    </Container>
  );
}
