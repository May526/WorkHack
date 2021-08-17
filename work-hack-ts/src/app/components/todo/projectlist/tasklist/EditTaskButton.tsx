import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { updateTask } from "../../../../../database/database_write";
import { task } from "../../../../../lib/types";

export default function EditTaskButton(props: {
  project_id: string;
  task_id: string;
  task: task;
}) {
  const { task, project_id, task_id } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const { register, handleSubmit } = useForm({ defaultValues: task });

  const onSubmit: SubmitHandler<task> = (data) => {
    updateTask(project_id, task_id, "name", data.name);
    updateTask(project_id, task_id, "point", data.point);
    updateTask(project_id, task_id, "deadline", data.deadline);
    updateTask(project_id, task_id, "estimated_time", data.estimated_time);
    toggle_modal();
  };

  return (
    <div>
      <Button size="sm" color="white" onClick={toggle_modal}>
        Edit
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle_modal}
        className="EditTaskModal"
        fade={false}
      >
        <ModalHeader>Edit</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              task name
              <input type="text" {...register("name")} />
            </label>
            <label>
              point
              <input type="text" {...register("point")} />
            </label>
            <label>
              deadline
              <input type="text" {...register("deadline")} />
            </label>
            <label>
              estimated_time [min]
              <input type="text" {...register("estimated_time")} />
            </label>
            <input type="submit" value="submit" />
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
