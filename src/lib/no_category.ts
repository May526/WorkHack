import { msToHMS } from './convertTypes';
import { extractTasksFromProjects } from './filters';
import { feeling, projects, task } from "./types";

const TaskToFeelingsWithTimestamp: (task: task) => [feeling, number][] = (task: task) => {
    if (!(task.feelings)) {
        return []
    }
    const before_feeling: [feeling, number] = [task.feelings.before, (task.started_at as number)]
    if (task.feelings.after) {
        const after_feeling: [feeling, number] = [task.feelings.after, (task.completed_at as number)]
        return [before_feeling, after_feeling]
    } else {
        return [before_feeling]
    }
}

export const extractFeelingsFromProjects = (projects: projects) => {
    const tasks_with_feeling = extractTasksFromProjects(projects, (task: task) => !!task.feelings);
    return tasks_with_feeling.reduce((acc, [task,]) => acc.concat(TaskToFeelingsWithTimestamp(task)), ([] as [feeling, number][]))
}


/**
 * [(10,10),(0,10),(0,0),(10,0)]の順
 * @param feeling_with_timestamp 
 * @param start_hour 
 * @param end_hour 
 */
export const computeFeelingRatios = (feeling_with_timestamp: [feeling, number][], start_hour: number, end_hour: number) => {
    const feelings_within_interval = feeling_with_timestamp.filter(([, timestamp]) => {
        const date = new Date(timestamp);
        return start_hour <= date.getHours() && date.getHours() < end_hour
    });
    if (feelings_within_interval.length === 0) {
        return [0, 0, 0, 0]
    }
    const feeling_counts = feelings_within_interval.reduce((acc, [feeling,]) => {
        const count_copy = acc.concat();
        if (feeling.energy >= 6 && feeling.pleasantness >= 6) {
            count_copy[0] += 1
        } else if (feeling.energy >= 6 && feeling.pleasantness <= 5) {
            count_copy[1] += 1
        } else if (feeling.energy <= 5 && feeling.pleasantness <= 5) {
            count_copy[2] += 1
        } else {
            count_copy[3] += 1
        }
        return count_copy
    }, [0, 0, 0, 0])
    return feeling_counts.map((n) => n / feelings_within_interval.length)
}

export const getPassedTime = (task: task) => {
    if (!(task.completed_at) || !(task.started_at)) {
        alert("ERROR : getPassedTIme get an uncomleted task. ")
        return ""
    }
    let start_to_end_ms = task.completed_at - task.started_at;
    if (task.paused_at) {
        const timestamps_paused = Object.keys(task.paused_at).map((num) => parseInt(num, 10));
        const timestamps_unpaused = Object.keys(task.unpaused_at ?? {}).map((num) => parseInt(num, 10));
        // lengthが一緒なら順番に差を取り、その総和がpauseされてた時間
        if (timestamps_paused.length === timestamps_unpaused.length) {
            for (let i = 0; i < timestamps_paused.length; i++) {
                start_to_end_ms -= timestamps_unpaused[i] - timestamps_paused[i]
            }
            // lengthがpaused_atの方が多いなら、indexが-1より前は上と同じでそれに加えて
            //   paused_at[-1]-completed_atの時間だけpausedされている
        } else if (timestamps_paused.length === (timestamps_unpaused.length + 1)) {
            if(timestamps_unpaused){
                for (let i = 0; (i < timestamps_paused.length - 1); i++) {
                    start_to_end_ms -= timestamps_unpaused[i] - timestamps_paused[i]
                }
            }
            start_to_end_ms -= task.completed_at - timestamps_paused[timestamps_paused.length-1]
            // それ以外のlengthはバグ
        } else {
            alert("ERROR in getPassedTime : invalid data")
            return ""
        }
    }
    const HMS = msToHMS(start_to_end_ms);
    return HMS.hour + ":" + HMS.minute + ":" + HMS.second

}

/**
 * 今日の午前00:00におけるDateオブジェクトを生成
 * @returns 
 */
 export const getTodayStartTimestamp = () => {
    const current_timestamp = new Date();
    return new Date(current_timestamp.getFullYear(),current_timestamp.getMonth(),current_timestamp.getDate())
}

/**
 * Localで今日の24:00(明日の00:00)であるDateオブジェクトを生成
 * @returns 
 */
 export const getTodayEndTimestamp = () => {
    const current_timestamp = new Date();
    return new Date(current_timestamp.getFullYear(),current_timestamp.getMonth(),current_timestamp.getDate(),24)
}


/**
 * 7日前の午前00:00時におけるDateオブジェクトを生成
 */
export const get7DaysAgoStartTimestamp = () => {
    const timestamp_7_days_ago = new Date(Date.now()-1000*60*60*24*7);
    return new Date(timestamp_7_days_ago.getFullYear(),timestamp_7_days_ago.getMonth(),timestamp_7_days_ago.getDate())
}

/**
 * Localで今月の1日の00:00におけるDateオブジェクトを生成
 */
export const getThisMonthStartTimestamp = () => {
    const current_timestamp = new Date();
    return new Date(current_timestamp.getFullYear(),current_timestamp.getMonth())
}

/**
 * 日付の文字列表示をDateから生成
 */
export const getDateLabelFromDate = (date:Date) => {
    let label = "";
    label += date.getFullYear() + "/";
    // zero fill
    label += ((date.getMonth()+1)<10?"0":"") + (date.getMonth()+1) + "/"
    label += (date.getDate()<10?"0":"") + date.getDate()
    return label
}

/**
 * dateがoldからlatestの中うち、どの位置にいるか百分率(整数)で表示
 * 範囲外の場合は-1を返す
 * 
 */
export const getDatePositionRatio = (date:Date,latest:Date,old:Date) => {
    if((date.getTime() < old.getTime()) || (latest.getTime() < date.getTime())) {
        return -1
    }
    const whole_distance = latest.getTime()-old.getTime(); 
    const target_distance = date.getTime()-old.getTime();
    return Math.round((target_distance/whole_distance)*100)
}

/**
 * dateのその日のlocal 00:00におけるDateオブジェクトを生成
 * @returns 
 */
 export const getDayStartTimestamp = (date:Date) => {
    return new Date(date.getFullYear(),date.getMonth(),date.getDate())
}

/**
 * dateのその日のlocal 24:00(明日の00:00)であるDateオブジェクトを生成
 * @returns 
 */
 export const getDayEndTimestamp = (date:Date) => {
    return new Date(date.getFullYear(),date.getMonth(),date.getDate(),24)
}