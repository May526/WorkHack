import React from "react";
import { Table } from "reactstrap";
import { Feeling } from "../../../lib/classes";
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
      <Table>
        <thead>
          <tr>
            <th></th>
            <th
              style={{
                backgroundColor: getColorByFeeling(new Feeling(10, 10, null)),
              }}
            ></th>
            <th
              style={{
                backgroundColor: getColorByFeeling(new Feeling(10, 0, null)),
              }}
            ></th>
            <th
              style={{
                backgroundColor: getColorByFeeling(new Feeling(0, 0, null)),
              }}
            ></th>
            <th
              style={{
                backgroundColor: getColorByFeeling(new Feeling(0, 10, null)),
              }}
            ></th>
          </tr>
        </thead>
        <tbody>
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
