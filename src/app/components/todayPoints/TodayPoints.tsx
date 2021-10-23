import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Col, Modal, ModalBody, Row } from "reactstrap";
import { computePnRatioWithDate } from "../../../lib/filters";
import { projects } from "../../../lib/types";

type QuestionnaireInputs = {
  day_subjective_wellbeing: number;
};

export default function TodayPoints(props: { projects: projects }) {
  const { projects } = props;

  const [is_calculated, setIsCalculated] = useState<boolean>(false);
  const [point, setPoint] = useState<number>(0);

  const [is_modal_open, setIsModalOpen] = useState<boolean>(false);
  const toggle_modal = () => setIsModalOpen(!is_modal_open);

  const { register, handleSubmit, watch } = useForm<QuestionnaireInputs>({
    defaultValues: { day_subjective_wellbeing: 5 },
  });

  const onSubmit: SubmitHandler<QuestionnaireInputs> = (data) => {
    toggle_modal();

    //認知的側面も感情的側面も、どちらも100点満点で
    //感情的側面の点数を算出するための入力データがない場合は、認知的側面を使用
    const recognitive_point = data.day_subjective_wellbeing * 10;

    const today_pn_ratio = computePnRatioWithDate(projects)[0];
    const emotinal_point =
      today_pn_ratio === -1
        ? recognitive_point
        : 3 <= today_pn_ratio && today_pn_ratio <= 5
        ? 100
        : 0;

    setPoint(Math.round(emotinal_point * 0.5 + recognitive_point * 0.5));
    setIsCalculated(true);
  };

  return (
    <div>
      {is_calculated ? (
        <div className="w-100 text-center fs-1 border-top border-bottom">
          {" "}
          {point} pts
        </div>
      ) : (
        <button className="w-100" onClick={toggle_modal}>
          {"今日の well-being point を算出する"}
        </button>
      )}
      <Modal
        isOpen={is_modal_open}
        toggle={toggle_modal}
        className="TodayPoints"
        fade={false}
      >
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <label htmlFor="questionnaire_day_subjective_wellbeing">
                  {"今日の生活にどのくらい満足していますか？"}
                </label>
              </Col>
              <Col xs="1">{watch("day_subjective_wellbeing")}</Col>
            </Row>
            <Row>
              <Col>
                <input
                  className="w-100"
                  id="questionnaire_day_subjective_wellbeing"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  {...register("day_subjective_wellbeing", {
                    valueAsNumber: true,
                  })}
                />
              </Col>
            </Row>
            <Row className="border-top">
              <Col className="mt-2">
                <button className="w-100" type="submit">
                  {"算出する"}
                </button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
