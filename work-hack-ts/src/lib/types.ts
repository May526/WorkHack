export interface task {
    id:string,
    name: string,
    point: string,
    deadline: number,
    estimated_time:number,
    is_ongoing: boolean,
    started_at: number|string,
    is_completed: boolean,
    completed_at: number|string,
    subtasks: string,
    feeling: {
        before: {
            energy: number,
            pleasantness: number,
        },
        after: {
            energy: number,
            pleasantness: number,
        },
    },
}
