import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateFeeling, updateTask } from "../../../database/database_write";
import { feeling } from "../../../lib/types";

export default function EmotionButton(props: {
  texts: string[];
  color: string;
  project_id: string;
  task_id: string;
  feeling: feeling;
  toggle_modal: () => any;
  start_or_complete: "start" | "complete";
}) {
  const {
    texts,
    color,
    project_id,
    task_id,
    feeling,
    toggle_modal,
    start_or_complete,
  } = props;
  const { handleSubmit } = useForm();

  const onSubmit: SubmitHandler<{}> = () => {
    if (start_or_complete === "start") {
      updateFeeling(project_id, task_id, "before", feeling);
      updateTask(project_id, task_id, "is_ongoing", true);
      updateTask(project_id, task_id, "started_at", Date.now());
    } else if (start_or_complete === "complete") {
      updateFeeling(project_id, task_id, "after", feeling);
      updateTask(project_id, task_id, "is_ongoing", false);
      updateTask(project_id, task_id, "is_completed", true);
      updateTask(project_id, task_id, "completed_at", Date.now());
    }
    toggle_modal();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit" className="w-100" style={{ background: color }}>
        {texts.map((text) => {
          return (
            <div>
              {text}
              <br></br>
            </div>
          );
        })}
      </button>
    </form>
  );
}
