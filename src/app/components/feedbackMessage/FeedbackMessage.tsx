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
import { feeling } from "../../../lib/types";

export default function FeedbackMessage(props:{feelings:[feeling,number][]}) {
  const {feelings} = props;
  return (
    <Container className="my-3">
      <Row>
        <Col style={{ backgroundColor: "#b5e61d66" }}>
          <p>{getGreeting()}</p>
          <p>{getYesterdayReviewMessage(feelings)}</p>
          <p>{getDailyReviewMessage(feelings)}</p>
          <p>{getActionRecommendTopMessage(feelings)}</p>
          <p>{getRecommendedActionsMessages(feelings)}</p>
          <p>{getEndingMessage()}</p>
        </Col>
      </Row>
    </Container>
  );
}
