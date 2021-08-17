import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { updateFeeling, updateTask } from "../../../../database/database_write";
import { feeling } from "../../../../lib/types";

export default function CompletedButton(props:{project_id:string,task_id:string}) {
  const { project_id, task_id } = props;

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const {register,handleSubmit}=useForm();
  const onSubmit: SubmitHandler<feeling> = (data) => {
    updateFeeling(project_id,task_id,"after",data);
    updateTask(project_id,task_id,"is_ongoing",false);
    updateTask(project_id,task_id,"is_completed",true);
    updateTask(project_id,task_id,"completed_at",Date.now());
    toggle_modal();
  }

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
        <ModalHeader>Choose your feeling</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>energy
            <input type="range" max="10" min="1" step="1" {...register("energy")} />
            </label>
            <label>pleasantness
            <input type="range" max="10" min="1" step="1" {...register("pleasantness")} />
            </label>
            <input type="submit" value="Complete this task !"/>
            <button type="button" onClick={toggle_modal}>Cancel</button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
