import {  Col, Container, Row } from "reactstrap";
import { Task } from "../../../lib/classes";
import EmotionTimeGraph from "../../components/emotionTimeGraph/EmotionTimeGraph";
import FeedbackMessage from "../../components/feedbackMessage/FeedbackMessage";
import PositiveDateGraph from "../../components/positiveDateGraph/PositiveDateGraph";

function Home() {

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
          <FeedbackMessage />
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
          <PositiveDateGraph />
        </Col>
        <Col>
          <EmotionTimeGraph tasks={tasks}/>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
