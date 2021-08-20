import { task, projects, project, tasks } from './types';

/**
 * projectsからindicator_func(task)がtrueであるtaskたちを返す.
 * @param projects 
 * @param indicator_func 
 * @returns 
 */
export const extractTasksFromProjects = (projects: projects, indicator_func: (task: task) => boolean) => {
    const project_entries = Object.entries(projects);
    let ret: [task: task, project_id: string, task_id: string][] = [];
    for (let [project_id, project] of project_entries) {
        let tasks = extractTasksFromProject(project_id, project, indicator_func);
        ret = ret.concat(tasks);
    }
    return ret;
}

/**
 * projectからindicator_func(task)がtrueであるtaskたちを返す.
 * @param project_id 
 * @param project 
 * @param indicator_func 
 * @returns 
 */
const extractTasksFromProject = (project_id: string, project: project, indicator_func: (task: task) => boolean): [task: task, project_id: string, task_id: string][] => {
    if (project.tasks) {
        return Object.entries(project.tasks).filter(([task_id, task]) => {
            return indicator_func(task)
        }).map(([task_id, task]) => {
            return [task, project_id, task_id]
        });
    } else {
        return [];
    }
};

export const getChildren = (tasks:tasks,parent_task_id: string) => {
    if(tasks===""){
        return {}
    }
    const children_entries = Object.entries(tasks).filter(([task_id, task]) => task.parent === parent_task_id )
    return Object.fromEntries(children_entries)
}
