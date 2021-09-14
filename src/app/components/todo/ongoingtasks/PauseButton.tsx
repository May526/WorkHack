import React from 'react'
import { Button } from 'reactstrap'
import { addPausedTime, addUnpausedTime, updateTask } from '../../../../database/database_write';
import { task } from '../../../../lib/types'

export default function PauseButton(props:{task:task,project_id:string,task_id:string}) {

    const {task,project_id,task_id} = props;
    const onClick = () => {
        if(task.is_paused){
            addUnpausedTime(project_id,task_id,new Date());
        }else{
            addPausedTime(project_id,task_id,new Date());
        };

        updateTask(project_id,task_id,"is_paused",!(task.is_paused));
    }


    return (
        <div>
            <Button size="sm" color={task.is_paused ? "danger":"secondary"} onClick={onClick}>{task.is_paused ? "Unpause this task":"Pause this task"}</Button>
        </div>
    )
}
