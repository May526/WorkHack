import { database } from './../firebase_init';
import { task, project, feeling, ids, tasks } from './../lib/types';

/**
 * userがrealtime databaseに登録済みなら何もしない, まだなら登録する
 * @param user 
 */
export const registerUser = (user: firebase.default.User) => {
  database.ref("users").child(user.uid).get().then((snapshot) => {
    if (snapshot.val()) {
    } else {
      database.ref("users").child(user.uid).set({ created_at: new Date().getTime(), updated_at: new Date().getTime() })
    }
  }).catch((reason) => alert(reason));
};

/**
 * projectを新しく登録する
 * @param user 
 * @param new_project 
 */
export const registerProject = (user: firebase.default.User,new_project:project) => {
  const new_projects_ref=database.ref("projects").push();
  new_projects_ref.set(new_project);
  const new_project_key = new_projects_ref.key;
  if(new_project_key){
    database.ref(`users/${user.uid}`).child("projects").child(new_project_key).set(true);
  }else{
    alert("serious error")
  }
};


/**
 * taskを新しく登録する
 * @param project_id 
 * @param new_task 
 */
 export const registerTask = (project_id:string, new_task:task) => {
  const new_task_ref=database.ref(`projects/${project_id}/tasks`).push();
  new_task_ref.set(new_task);
};

/**
 * 指定のtaskの属性を更新する
 * @param project_id 
 * @param task_id 
 * @param key 
 * @param value 
 */
export const updateTask = (project_id:string, task_id:string, key:string, value:any) => {
  const task_ref = database.ref(`projects/${project_id}/tasks/${task_id}/${key}`);
  task_ref.set(value);
}

export const addPausedTime = (project_id:string,task_id:string,timestamp:Date) => {
  database.ref(`projects/${project_id}/tasks/${task_id}`).child("paused_at").child(timestamp.getTime().toString()).set(true);
}

export const addUnpausedTime = (project_id:string,task_id:string,timestamp:Date) => {
  database.ref(`projects/${project_id}/tasks/${task_id}`).child("unpaused_at").child(timestamp.getTime().toString()).set(true);
}

/**
 * 指定のtaskのfeelingsのafterかbeforeを更新する
 * @param project_id 
 * @param task_id 
 * @param key 
 * @param feeling 
 */
export const updateFeeling = (project_id:string, task_id:string, key:"after"|"before", feeling:feeling) => {
  const task_ref = database.ref(`projects/${project_id}/tasks/${task_id}`).child("feelings").child(`${key}`);
  task_ref.set(feeling);
}

/**
 * 指定のprojectの name|member を更新する
 * @param project_id 
 * @param key 
 * @param value 
 */
export const updateProject = (project_id:string, key:"name"|"memeber",value:string|ids) => {
  const project_ref = database.ref(`projects/${project_id}/${key}`);
  project_ref.set(value);
}

/**
 * 指定のtaskのみをrealtime databaseから削除する
 * @param project_id 
 * @param task_id 
 */
const deleteOneTask = (project_id:string,task_id:string) => {
  const task_ref = database.ref(`projects/${project_id}/tasks/${task_id}`);
  task_ref.remove();
}


export const deleteTask = (project_id:string,root_task_id:string,tasks:tasks) => {
  deleteOneTask(project_id,root_task_id);
  for(const [task_id,task] of Object.entries(tasks)){
    if(task.parent===root_task_id){
      deleteTask(project_id,task_id,tasks)
    }
  }
}

/**
 * 指定のprojectを削除
 * @param project_id 
 * @param user 
 */
export const deleteProject = async (project_id:string) => {
  const project_ref = database.ref(`projects/${project_id}`);
  const member_ids_snapshot = await project_ref.child("/member").get();
  const member_ids = Object.keys(member_ids_snapshot.val());
  for(const member_id of member_ids){
    await database.ref(`users/${member_id}/projects/${project_id}`).remove();
  }
  await project_ref.remove();
}