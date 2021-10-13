import React from "react";
import { Col, Container, Row } from "reactstrap";
import {
  getActionRecommendTopMessage,
  getDailyReviewMessage,
  getEndingMessage,
  getGreeting,
  getRecommendedActionsMessages,
  getYesterdayReviewMessage,
} from "../../../lib/feedbackMessage";

export default function FeedbackMessage() {
  return (
    <Container className="my-3">
      <Row>
        <Col style={{ backgroundColor: "#b5e61d66" }}>
          <p>{getGreeting()}</p>
          <p>{getYesterdayReviewMessage()}</p>
          <p>{getDailyReviewMessage()}</p>
          <p>{getActionRecommendTopMessage()}</p>
          {getRecommendedActionsMessages().map((message) => {
            return (<p>{"- "+message}</p>)
          })}
          <p>{getEndingMessage()}</p>
        </Col>
      </Row>
    </Container>
  );
}
