import { extractFeelingsFromProjects, get7DaysAgoStartTimestamp, getDayStartTimestamp, getDayEndTimestamp, getTodayEndTimestamp } from './no_category';
import { task, projects, project, tasks, feeling } from './types';

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

export const getChildren = (tasks: tasks, parent_task_id: string) => {
    if (tasks) {
        const children_entries = Object.entries(tasks).filter(([task_id, task]) => task.parent === parent_task_id)
        return Object.fromEntries(children_entries)
    } else {
        return {}

    }

}

export const computePnRatioWithDate = (projects:projects) => {
    const feelings_in_7_days = extractFeelingsFromProjects(projects).filter(([feeling,timestamp])=>{
        const latest_timestamp = getTodayEndTimestamp().getTime();
        const oldest_timestamp = get7DaysAgoStartTimestamp().getTime();
        return oldest_timestamp <= timestamp && timestamp <= latest_timestamp;
      })
    
    const feelings_each_day : feeling[][]= [[],[],[],[],[],[],[]]
    for(const [feeling,timestamp] of feelings_in_7_days){
        for(let i=0;i<7;i++){

            let target_date = new Date(Date.now()-1000*60*60*24*i);
            let old_timestamp = getDayStartTimestamp(target_date).getTime();
            let latest_timestamp = getDayEndTimestamp(target_date).getTime();

            if(old_timestamp <= timestamp && timestamp <= latest_timestamp){
                feelings_each_day[i].push(feeling)
            }

        }
    }
    return feelings_each_day.map((feelings)=>{
        if(feelings.length===0){
            return -1
        }
        let positive_num = 0;
        let negative_num = 0;
        for(let feeling of feelings){
            if(feeling.pleasantness>5){
                positive_num+=1
            }else{
                negative_num+=1
            }
        }
        if(negative_num===0){
            return 6
        }
        return Math.min(positive_num/negative_num,6)
    });
}