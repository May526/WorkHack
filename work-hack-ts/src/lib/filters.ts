import { task, projects, project } from './types';
export const extractTasksFromProjects = (projects: projects, indicator_func: (task: task) => boolean) => {
    const project_entries = Object.entries(projects);
    let ret: [task: task, project_id: string, task_id: string][] = [];
    for (let [project_id, project] of project_entries) {
        let tasks = extractTasksFromProject(project_id, project, indicator_func);
        ret = ret.concat(tasks);
    }
    return ret;
}


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