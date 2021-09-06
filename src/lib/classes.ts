import { ids, tasks, task, feeling, project } from './types';

export class Project implements project {
    name: string;
    member: ids;
    tasks: tasks | null;
    constructor(user: firebase.default.User, name?:string, tasks?:tasks) {
        this.name = name ?? "";
        this.member = Object.fromEntries([[user.uid, true]]);
        this.tasks = tasks ?? null;
    }
}

export class Feeling implements feeling {
    energy: number;
    pleasantness: number;

    constructor(energy = -1, pleasantness = -1) {
        this.energy = energy;
        this.pleasantness = pleasantness;
    }
}

export class Task implements task {
    name: string;
    point: number | string;

    deadline: string;
    estimated_time: string;

    is_ongoing: boolean;
    is_completed: boolean;

    started_at: number | null;
    completed_at: number | null;

    feelings: {
        before: feeling,
        after: feeling | null
    } | null;

    parent: string;

    constructor() {
        this.name = "";
        this.point = 0;
        this.deadline = "";
        this.estimated_time = "";

        this.is_ongoing = false;
        this.is_completed = false;

        this.started_at = null;
        this.completed_at = null;
        this.feelings = null;

        this.parent = "";
    }
}