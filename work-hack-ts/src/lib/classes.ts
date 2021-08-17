import { ids, tasks, task, feeling } from './types';

export class Project {
    name:string;
    member:ids;
    tasks:tasks|""
    constructor(user:firebase.default.User){
        this.name="";
        this.member=Object.fromEntries([[user.uid,true]]);
        this.tasks=""
    }
}

export class Feeling implements feeling {
    energy:number;
    pleasantness:number;

    constructor(energy=-1,pleasantness=-1){
        this.energy=energy;
        this.pleasantness=pleasantness;
    }
}

export class Task implements task{
    name:string;
    point:string;
    deadline:string;
    estimated_time:string;

    is_ongoing:boolean;
    is_completed:boolean;

    started_at:number|"";
    completed_at:number|"";
    feelings:{
        before:feeling,
        after:feeling
    }
    constructor(){
        this.name="";
        this.point="";
        this.deadline="";
        this.estimated_time="";
        
        this.is_ongoing=false;
        this.is_completed=false;

        this.started_at="";
        this.completed_at="";
        this.feelings={
            before:new Feeling(),
            after:new Feeling()
        }
    }
}