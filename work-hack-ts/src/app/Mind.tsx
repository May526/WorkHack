import React from "react";
import { Row } from "reactstrap";
import MindHistoryGraph from "./components/mind/MindHistoryGraph";
import TasksMindsTable from "./components/mind/TasksMindsTable";

export default function Mind() {
  return (
    <div>
      <Row>
        <div className="d-flex border-bottom">
          <h1 className="h2">Mind History</h1>
        </div>
        <MindHistoryGraph />
      </Row>
      <Row>
        <div className="d-flex border-bottom">
          <h1 className="h2">Completed Tasks</h1>
        </div>
        <TasksMindsTable />
      </Row>
    </div>
  );
}
