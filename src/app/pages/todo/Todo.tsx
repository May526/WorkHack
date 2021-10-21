import { Row, Col } from "reactstrap";
import OngoingTasks from "../../components/ongoingTasks/OngoingTasks";
import ProjectList from "../../components/projectList/ProjectList";

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
