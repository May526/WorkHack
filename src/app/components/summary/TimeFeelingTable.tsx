import React from "react";
import { Table } from "reactstrap";
import { Feeling } from "../../../lib/classes";
import { getIdealEmotionRatioArea, PLEASANT_ENEGY_LABELS, PLEASANT_UNENEGY_LABELS, UNPLEASANT_ENEGY_LABELS, UNPLEASANT_UNENEGY_LABELS } from "../../../lib/constants";
import {
  computeFeelingRatios,
  extractFeelingsFromProjects,
  getColorByFeeling,
} from "../../../lib/no_category";
import { projects } from "../../../lib/types";

export default function TimeFeelingTable(props: { projects: projects }) {
  const { projects } = props;
  const feelings_with_timestamp = extractFeelingsFromProjects(projects);
  return (
    <div>
      <Table style={{tableLayout:"fixed"}}>
        <thead>
          <tr style={{fontSize:"smaller"}}>
            <th></th>
            <th
              style={{
                backgroundColor: getColorByFeeling(new Feeling(10, 10, null)),
              }}
            >{PLEASANT_ENEGY_LABELS.reduce((acc,cur)=>acc+'/'+cur)}</th>
            <th
              style={{
                backgroundColor: getColorByFeeling(new Feeling(10, 0, null)),
              }}
            >{UNPLEASANT_ENEGY_LABELS.reduce((acc,cur)=>acc+'/'+cur)}</th>
            <th
              style={{
                backgroundColor: getColorByFeeling(new Feeling(0, 0, null)),
              }}
            >{UNPLEASANT_UNENEGY_LABELS.reduce((acc,cur)=>acc+'/'+cur)}</th>
            <th
              style={{
                backgroundColor: getColorByFeeling(new Feeling(0, 10, null)),
              }}
            >{PLEASANT_UNENEGY_LABELS.reduce((acc,cur)=>acc+'/'+cur)}</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{borderBottomStyle:"double",borderBottomWidth:"3px"}}>
            <th>ideal</th>
            {getIdealEmotionRatioArea() && getIdealEmotionRatioArea()?.map(([lower,upper])=><td>{lower+"%-"+upper+"%"}</td>)}
          </tr>
          <tr>
            <th>morning (06:00-10:00) </th>
            {computeFeelingRatios(feelings_with_timestamp, 6, 10).map(
              (ratio: number, index) => {
                return <td key={index}>{Math.ceil(ratio * 100)}%</td>;
              }
            )}
          </tr>
          <tr>
            <th>daytime (10:00-17:00)</th>
            {computeFeelingRatios(feelings_with_timestamp, 10, 17).map(
              (ratio: number, index) => {
                return <td key={index}>{Math.ceil(ratio * 100)}%</td>;
              }
            )}
          </tr>
          <tr>
            <th>night (17:00-24:00)</th>
            {computeFeelingRatios(feelings_with_timestamp, 17, 24).map(
              (ratio: number, index) => {
                return <td key={index}>{Math.ceil(ratio * 100)}%</td>;
              }
            )}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
