export type task = {
    name: string,
    point: number | string,
    deadline: string,
    estimated_time:string,

    is_ongoing: boolean,
    is_completed: boolean,

    started_at: number|null,
    completed_at: number|null,

    feelings: {
        before: feeling,
        after: feeling | null
    } | null,

    parent:string,
}

export type feeling = {
    energy:number,
    pleasantness:number
}

export type project = {
    name:string,
    member:ids,
    tasks:tasks | null,
}

export type ids = {[index: string]:true}
export type projects ={[index: string]:project}
export type tasks ={[index: string]:task}