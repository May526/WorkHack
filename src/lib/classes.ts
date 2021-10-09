import { ids, tasks, task, feeling, project } from './types';

export class Project implements project {
    name: string;
    member: ids;
    tasks: tasks | null;
    constructor(user: firebase.default.User, name?: string, tasks?: tasks) {
        this.name = name ?? "";
        this.member = Object.fromEntries([[user.uid, true]]);
        this.tasks = tasks ?? null;
    }
}

export class Feeling implements feeling {
    energy: number;
    pleasantness: number;
    is_related_with_task: boolean | null;

    constructor(energy = -1, pleasantness = -1, is_related_with_task: boolean | null) {
        this.energy = energy;
        this.pleasantness = pleasantness;
        this.is_related_with_task = is_related_with_task;
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

    constructor(name: string = "", point: number = 0, deadline: string = "", started_at: number | null = null, completed_at: number | null = null, feelings: {
        before: feeling,
        after: feeling | null
    } | null = null, parent: string = "") {
        this.name = name;
        this.point = point;
        this.deadline = deadline;
        this.estimated_time = "";

        this.is_ongoing = false;
        this.is_completed = false;

        this.started_at = started_at;
        this.completed_at = completed_at;
        this.feelings = feelings;

        this.parent = parent;
    }
}