import { useRef, useState } from "react";
import { Input, Table } from "reactstrap";
import { getFeelingLabels, PLEASANT_ENEGY_LABELS, PLEASANT_UNENEGY_LABELS, UNPLEASANT_ENEGY_LABELS, UNPLEASANT_UNENEGY_LABELS } from "../../../../lib/constants";
import { extractTasksFromProjects } from "../../../../lib/filters";
import { getColorByFeeling } from "../../../../lib/no_category";
import { feeling, projects, task } from "../../../../lib/types";

type FeelingLables = "all"|"わくわく/楽しい/嬉しい"|"ストレ/緊張/いらいら"|"疲れた/退屈/うんざり"|"リラックス/落ち着いている/癒し"

export default function TasksMindsTable(props: { projects: projects }) {
  const { projects } = props;

  const tasks = extractTasksFromProjects(
    projects,
    (task: any) => task.is_completed
  ).map(([task, pi, ti]) => {
    return task;
  });

  tasks.sort(
    (task1: task, task2: task) =>
      (task2.completed_at as number) - (task1.completed_at as number)
  );

  const [before_feeling,setBeforeFeeling] = useState<FeelingLables>("all")
  const [after_feeling,setAfterFeeling] = useState<FeelingLables>("all")

  return (
    <div>
      <Table style={{tableLayout:"fixed"}}>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>
              <Input bsSize="sm" type="select" value={before_feeling} onChange={(event)=>setBeforeFeeling(event.target.value as FeelingLables)}>
                <option selected value="all">All</option>
                <option value={PLEASANT_ENEGY_LABELS.join("/")}>{PLEASANT_ENEGY_LABELS.join("/")}</option>
                <option value={UNPLEASANT_ENEGY_LABELS.join("/")}>{UNPLEASANT_ENEGY_LABELS.join("/")}</option>
                <option value={UNPLEASANT_UNENEGY_LABELS.join("/")}>{UNPLEASANT_UNENEGY_LABELS.join("/")}</option>
                <option value={PLEASANT_UNENEGY_LABELS.join("/")}>{PLEASANT_UNENEGY_LABELS.join("/")}</option>
              </Input> 
              Before
            </th>
            <th>
            <Input bsSize="sm" type="select" value={after_feeling} onChange={(event)=>setAfterFeeling(event.target.value as FeelingLables)}>
                <option selected value="all">All</option>
                <option value={PLEASANT_ENEGY_LABELS.join("/")}>{PLEASANT_ENEGY_LABELS.join("/")}</option>
                <option value={UNPLEASANT_ENEGY_LABELS.join("/")}>{UNPLEASANT_ENEGY_LABELS.join("/")}</option>
                <option value={UNPLEASANT_UNENEGY_LABELS.join("/")}>{UNPLEASANT_UNENEGY_LABELS.join("/")}</option>
                <option value={PLEASANT_UNENEGY_LABELS.join("/")}>{PLEASANT_UNENEGY_LABELS.join("/")}</option>
              </Input> 
              After
            </th>
            <th>start at</th>
            <th>complete at</th>
            <th style={{fontSize:"small"}}>感情の変化はtaskと関係してる</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task: task, index: number) => {
              if(!((before_feeling==="all") || (before_feeling===getFeelingLabels((task.feelings as { before: feeling; after: feeling }).before).reduce((acc,cur)=>acc+"/"+cur)))){
                return <div key={index}></div>
              }
              if(!((after_feeling==="all") || (after_feeling===getFeelingLabels((task.feelings as { before: feeling; after: feeling }).after).reduce((acc,cur)=>acc+"/"+cur)))){
                return <div key={index}></div>
              }
              return (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td
                    style={{
                      background: getColorByFeeling(
                        (task.feelings as { before: feeling; after: feeling })
                          .before
                      ),
                      fontSize:"smaller"
                    }}
                  >{getFeelingLabels((task.feelings as { before: feeling; after: feeling }).before).reduce((acc,cur)=>acc+"/"+cur)}</td>
                  <td
                    style={{
                      background: getColorByFeeling(
                        (task.feelings as { before: feeling; after: feeling })
                          .after
                      ),
                      fontSize:"smaller"
                    }}
                  >{getFeelingLabels((task.feelings as { before: feeling; after: feeling }).after).reduce((acc,cur)=>acc+"/"+cur)}</td>
                  <td>
                    {new Date(task.started_at as number).toLocaleString()}
                  </td>
                  <td>
                    {new Date(task.completed_at as number).toLocaleString()}
                  </td>
                  <td>
                    {task.feelings?.after?.is_related_with_task ? "yes": "no"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
