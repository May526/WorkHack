import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { TodoTaskInput } from "../../../../../../lib/types";

export default function TodoTaskForm(props: {
  unique_id: string;
  parent_task_id: string;
  onSubmit: (data: TodoTaskInput) => any;
}) {
  const { unique_id, parent_task_id, onSubmit } = props;

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: "",
      point: 0,
      deadline: "",
      parent: parent_task_id,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data: TodoTaskInput) => {
        onSubmit(data);
        reset();
      })}
    >
      <Row className="my-1">
        <Col xs="4" className="d-flex justify-content-end">
          <label htmlFor={`${unique_id}name`}>task name*</label>
        </Col>
        <Col>
          <input
            className="w-100"
            id={`${unique_id}name`}
            type="text"
            {...register("name", { required: true })}
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col xs="4" className="d-flex justify-content-end">
          <label htmlFor={`${unique_id}point`}>point*</label>
        </Col>
        <Col>
          <input
            className="w-100"
            id={`${unique_id}point`}
            type="number"
            {...register("point", {
              valueAsNumber: true,
            })}
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col xs="4" className="d-flex justify-content-end">
          <label htmlFor={`${unique_id}deadline`}>deadline</label>
        </Col>
        <Col>
          <input
            className="w-100"
            id={`${unique_id}deadline`}
            type="text"
            {...register("deadline")}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <input className="w-100" type="submit" value="submit" />
        </Col>
      </Row>
    </form>
  );
}
