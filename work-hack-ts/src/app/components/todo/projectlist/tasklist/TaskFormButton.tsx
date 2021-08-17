import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { registerTask } from "../../../../../database/database_write";
import { Task } from "../../../../../lib/classes";

type TaskInput = {
  name: string;
  point: string;
  deadline: string;
  estimated_time: number | "";
};

export default function TaskForm(props: { project_id: string }) {
  const { project_id } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", point: "", deadline: "", estimated_time: "" },
  });

  const onSubmit: SubmitHandler<TaskInput> = (inputs, event) => {
    const new_task = new Task();
    Object.assign(new_task, inputs);
    registerTask(project_id, new_task);
    reset();
    toggle_modal();
  };

  return (
    <div>
      <Button size="sm" color="dark" onClick={toggle_modal}>
        Add a new task
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle_modal}
        className="TaskFormModal"
        fade={false}
      >
        <ModalHeader toggle={toggle_modal}>Add a task</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              task name
              <input type="text" {...register("name", { required: true })} />
            </label>
            <label>
              point
              <input {...register("point", { required: true })} />
            </label>
            <label>
              deadline
              <input {...register("deadline")} />
            </label>
            <label>
              estimated_time
              <input {...register("estimated_time")} />
            </label>
            <input type="submit" value="submit" />
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
