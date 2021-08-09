export interface task {
    id:string,
    name: string,
    point: string,
    deadline: number,
    estimated_time:number|"",
    is_ongoing: boolean,
    started_at: number|"",
    is_completed: boolean,
    completed_at: number|"",
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
