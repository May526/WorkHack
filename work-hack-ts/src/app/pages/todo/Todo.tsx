import { Row, Col } from "reactstrap";
import OngoingTasks from "../../components/todo/OngoingTasks";
import ProjectList from "../../components/todo/ProjectList";

export default function TodoPage() {
  return (
    <div>
      <Row>
        <Col>
          <OngoingTasks />
        </Col>
      </Row>
      <Row>
        <Col>
          <ProjectList />
        </Col>
      </Row>
    </div>
  );
}
