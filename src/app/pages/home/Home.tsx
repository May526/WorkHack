import { useContext, useEffect, useState } from "react";
import {  Col, Container, Row } from "reactstrap";
import { AuthContext } from "../../../auth/AuthProvider";
import { fetchProjects } from "../../../database/database_read";
import { computePnRatioWithDate, extractTasksFromProjects } from "../../../lib/filters";
import { extractFeelingsFromProjects } from "../../../lib/no_category";
import { projects } from "../../../lib/types";
import EmotionTimeGraph from "../../components/emotionTimeGraph/EmotionTimeGraph";
import FeedbackMessage from "../../components/feedbackMessage/FeedbackMessage";
import PositiveDateGraph from "../../components/positiveDateGraph/PositiveDateGraph";

function Home() {

  const {currentUser} = useContext(AuthContext);
  const [projects,setProjects] = useState<projects>({});
  useEffect(()=>{
    if(currentUser){
      fetchProjects(currentUser,setProjects)
    }
  },[currentUser])

  const tasks = extractTasksFromProjects(projects,(task)=>task.is_completed).map(([task,])=>task);

  return (
    <Container fluid>
      <Row>
        <Col>
          <FeedbackMessage feelings={extractFeelingsFromProjects(projects)}/>
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
          <PositiveDateGraph positive_negative_ratios={computePnRatioWithDate(projects)}/>
        </Col>
        <Col>
          <EmotionTimeGraph tasks={tasks}/>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
