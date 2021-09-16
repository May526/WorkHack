import { extractTasksFromProjects } from './filters';
import { feeling, projects, task } from "./types";


/**
 * feelingの値からrgbのcolorコードを取得する
 * @param feeling 
 * @returns "#xxyyzz"の形をしたrgb-string
 */
export const getColorByFeeling = (feeling:feeling) => {
    if(feeling.energy<5){
        if(feeling.pleasantness<5){
            return "#c6eff5"
        }else{
            return "#e6f2da"
        }
    }else{
        if(feeling.pleasantness<5){
            return "#f5cfce"
        }else{
            return "#fde9d1"
        }
    }
}

const TaskToFeelingsWithTimestamp:(task:task)=>[feeling,number][] = (task:task) => {
    if(!(task.feelings)){
        return []
    }
    const before_feeling:[feeling,number] = [task.feelings.before,(task.started_at as number)]
    if(task.feelings.after){
        const after_feeling:[feeling,number] = [task.feelings.after,(task.completed_at as number)]
        return [before_feeling,after_feeling]
    }else{
       return [before_feeling] 
    }
}

export const extractFeelingsFromProjects = (projects:projects) => {
    const tasks_with_feeling = extractTasksFromProjects(projects,(task:task)=>!!task.feelings);
    return tasks_with_feeling.reduce((acc,[task,])=>acc.concat(TaskToFeelingsWithTimestamp(task)),([] as [feeling,number][]))
}


/**
 * [(10,10),(0,10),(0,0),(10,0)]
 * @param feeling_with_timestamp 
 * @param start_hour 
 * @param end_hour 
 */
export const computeFeelingRatios = (feeling_with_timestamp:[feeling,number][],start_hour:number,end_hour:number) => {
    const feelings_within_interval = feeling_with_timestamp.filter(([,timestamp])=>{
        const date = new Date(timestamp);
        return start_hour <= date.getHours() && date.getHours() < end_hour
    });
    if(feelings_within_interval.length===0){
        return [0,0,0,0]
    }
    const feeling_counts = feelings_within_interval.reduce((acc,[feeling,])=>{
        const count_copy = acc.concat();
        if(feeling.energy>=6 && feeling.pleasantness>=6){
            count_copy[0]+=1
        }else if(feeling.energy>=6 && feeling.pleasantness<=5){
            count_copy[1]+=1
        }else if(feeling.energy<=5 && feeling.pleasantness<=5){
            count_copy[2]+=1
        }else{
            count_copy[3]+=1
        }
        return count_copy
    },[0,0,0,0])
    return feeling_counts.map((n)=>n/feelings_within_interval.length)
}
