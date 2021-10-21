import React from "react";
import ReactDatetimeClass from "react-datetime";
import { Controller, useForm } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { CompletedTaskInput } from "../../../../../lib/types";
import {
  PLEASANT_ENEGY_LABELS,
  PLEASANT_UNENEGY_LABELS,
  UNPLEASANT_ENEGY_LABELS,
  UNPLEASANT_UNENEGY_LABELS,
} from "../../../../../lib/constants";
import { getColorByFeeling } from "../../../../../lib/constants";
import { Feeling } from "../../../../../lib/classes";

export default function CompletedTaskForm(props: {
  unique_id: string;
  parent_task_id: string;
  onSubmit: (data: CompletedTaskInput) => any;
}) {
  const { unique_id, parent_task_id, onSubmit } = props;

  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: {
      name: "",
      point: 0,
      deadline: "",
      started_at: new Date(),
      completed_at: new Date(),

      before_feelings: "p-e",
      after_feelings: "p-e",

      is_ralated_with_task: true,

      parent: parent_task_id,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data: CompletedTaskInput) => {
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
      <Row className="my-1">
        <Col xs="4" className="d-flex justify-content-end">
          <label htmlFor={`${unique_id}started_at`}>start time</label>
        </Col>
        <Col>
          <Controller
            control={control}
            name="started_at"
            render={({ field }) => <ReactDatetimeClass {...field} />}
          />
        </Col>
      </Row>

      <Row className="my-1">
        <Col xs="4" className="d-flex justify-content-end">
          <label htmlFor={`${unique_id}before_feelings`}>start emotion</label>
        </Col>
        <Col>
          <Row
            style={{
              backgroundColor: getColorByFeeling(new Feeling(10, 10, null)),
            }}
          >
            <Col xs="2">
              <input
                className="w-100"
                id="b_p-e"
                type="radio"
                value="p-e"
                {...register("before_feelings", { required: true })}
              />
            </Col>
            <Col>
              <label htmlFor="b_p-e">{PLEASANT_ENEGY_LABELS.join("/")}</label>
            </Col>
          </Row>
          <Row
            style={{
              backgroundColor: getColorByFeeling(new Feeling(10, 0, null)),
            }}
          >
            <Col xs="2">
              <input
                className="w-100"
                type="radio"
                {...register("before_feelings", { required: true })}
                id="b_up-e"
                value="up-e"
              />
            </Col>
            <Col>
              <label htmlFor="b_up-e">
                {UNPLEASANT_ENEGY_LABELS.join("/")}
              </label>
            </Col>
          </Row>
          <Row
            style={{
              backgroundColor: getColorByFeeling(new Feeling(0, 0, null)),
            }}
          >
            <Col xs="2">
              <input
                className="w-100"
                type="radio"
                {...register("before_feelings", { required: true })}
                id="b_up-ue"
                value="up-ue"
              />
            </Col>
            <Col>
              <label htmlFor="b_p-ue">
                {UNPLEASANT_UNENEGY_LABELS.join("/")}
              </label>
            </Col>
          </Row>
          <Row
            style={{
              backgroundColor: getColorByFeeling(new Feeling(0, 10, null)),
            }}
          >
            <Col xs="2">
              <input
                className="w-100"
                type="radio"
                {...register("before_feelings", { required: true })}
                id="b_p-ue"
                value="p-ue"
              />
            </Col>
            <Col>
              <label htmlFor="b_p-ue">
                {PLEASANT_UNENEGY_LABELS.join("/")}
              </label>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="my-1">
        <Col xs="4" className="d-flex justify-content-end">
          <label htmlFor={`${unique_id}completed_at`}>complete time</label>
        </Col>
        <Col>
          <Controller
            control={control}
            name="completed_at"
            render={({ field }) => <ReactDatetimeClass {...field} />}
          />
        </Col>
      </Row>

      <Row className="my-1">
        <Col xs="4" className="d-flex justify-content-end">
          <label htmlFor={`${unique_id}after_feelings`}>complete emotion</label>
        </Col>
        <Col>
          <Row
            style={{
              backgroundColor: getColorByFeeling(new Feeling(10, 10, null)),
            }}
          >
            <Col xs="2">
              <input
                className="w-100"
                id="a_p-e"
                type="radio"
                value="p-e"
                {...register("after_feelings", { required: true })}
              />
            </Col>
            <Col>
              <label htmlFor="a_p-e">{PLEASANT_ENEGY_LABELS.join("/")}</label>
            </Col>
          </Row>
          <Row
            style={{
              backgroundColor: getColorByFeeling(new Feeling(10, 0, null)),
            }}
          >
            <Col xs="2">
              <input
                className="w-100"
                type="radio"
                {...register("after_feelings", { required: true })}
                id="a_up-e"
                value="up-e"
              />
            </Col>
            <Col>
              <label htmlFor="a_up-e">
                {UNPLEASANT_ENEGY_LABELS.join("/")}
              </label>
            </Col>
          </Row>
          <Row
            style={{
              backgroundColor: getColorByFeeling(new Feeling(0, 0, null)),
            }}
          >
            <Col xs="2">
              <input
                className="w-100"
                type="radio"
                {...register("after_feelings", { required: true })}
                id="a_up-ue"
                value="up-ue"
              />
            </Col>
            <Col>
              <label htmlFor="a_p-ue">
                {UNPLEASANT_UNENEGY_LABELS.join("/")}
              </label>
            </Col>
          </Row>
          <Row
            style={{
              backgroundColor: getColorByFeeling(new Feeling(0, 10, null)),
            }}
          >
            <Col xs="2">
              <input
                className="w-100"
                type="radio"
                {...register("after_feelings", { required: true })}
                id="a_p-ue"
                value="p-ue"
              />
            </Col>
            <Col>
              <label htmlFor="a_p-ue">
                {PLEASANT_UNENEGY_LABELS.join("/")}
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                <input
                  type="checkbox"
                  {...register("is_ralated_with_task", { required: true })}
                />{" "}
                このタスクによって、今の気持ちになった
              </label>
            </Col>
          </Row>
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
