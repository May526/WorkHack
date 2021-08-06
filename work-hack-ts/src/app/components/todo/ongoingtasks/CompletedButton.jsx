import React, { useState ,useContext} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useSetTask } from "../../../../database/database_write";
import { ProjectsContext } from "../../../contexts/ProjectsContext";

export default function CompletedButton(props) {
  const {project_id,task}= props;
  const setTask = useSetTask(project_id,task.task_id);
  
  const { NullFeeling } = useContext(ProjectsContext);
  

  const [modal, setModal] = useState(false);

  const [new_feeling, setNewFeeling] = useState(NullFeeling);

  const toggle_modal = () => setModal(!modal);

  const handleChange = (event) => {
    let copy = {...new_feeling};
    copy[event.target.name] = event.target.value;
    setNewFeeling(copy);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let copy = {...task};
    copy["is_completed"] = true;
    copy["is_ongoing"] = false;
    copy["task_id"]=null;
    copy.feeling.after = new_feeling;
    copy.completed_at = Date.now();
    setTask(copy);
  };

  return (
    <div>
      <Button size="sm" color="success" onClick={toggle_modal}>
        Complete this task
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle_modal}
        className="CompletedTaskModal"
        fade={false}
      >
        <ModalHeader>Track</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>Choose your feeling</Col>
            </Row>
            <Row>
              <Col xs="1" className="d-flex align-items-stretch">
                <Input
                  className="w-100"
                  type="range"
                  max="10"
                  min="1"
                  step="1"
                  orient="vertical"
                  name="pleasantness"
                  value={new_feeling.pleasantness}
                  onChange={handleChange}
                />
              </Col>
              <Col className="flex-grow-1">
              <ResponsiveContainer width="90%" height="90%">
                  <ScatterChart width={10} height={10}>
                    <CartesianGrid />
                    <XAxis
                      hide
                      ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                      type="number"
                      dataKey="x"
                      domain={[1, 10]}
                    />
                    <YAxis
                      hide
                      dataKey="y"
                      domain={[1, 10]}
                      type="number"
                      ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    />

                    <Scatter
                      data={[
                        {
                          x: new_feeling.energy,
                          y: new_feeling.pleasantness,
                        },
                      ]}
                      fill="#8884d8"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </Col>
            </Row>
            <Row>
              <Col xs="1"></Col>
              <Col className="flex-grow-1">
                <Input
                  className="w-100"
                  type="range"
                  max="10"
                  min="1"
                  step="1"
                  name="energy"
                  value={new_feeling.energy}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit" color="success" onClick={toggle_modal}>Complete this task !</Button>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button onClick={toggle_modal}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
