import React from 'react'
import { Button } from 'reactstrap'
import { updateTask } from '../../../../database/database_write';
import { task } from '../../../../lib/types'

export default function PauseButton(props:{task:task,project_id:string,task_id:string}) {

    const {task,project_id,task_id} = props;
    const onClick = () => {
        updateTask(project_id,task_id,"is_paused",!(task.is_paused));
    }


    return (
        <div>
            <Button size="sm" color={task.is_paused ? "danger":"secondary"} onClick={onClick}>{task.is_paused ? "Unpause this task":"Pause this task"}</Button>
        </div>
    )
}
