import { task, project, feeling } from './../lib/types';
import { database } from "../firebase_init";

/**
 * userがrealtime databaseに登録済みなら何もしない, まだなら登録する
 * @param user 
 */
export const registerUser = (user: firebase.default.User) => {
  database.ref("users").child(user.uid).get().then((snapshot) => {
    if (snapshot.val()) {
      console.log("already exists");
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
  const new_project_key =new_projects_ref.key;

  database.ref(`users/${user.uid}`).child("projects").child(new_project_key as string).set(true);
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

/**
 * 指定のtaskのfeelingsのafterかbeforeを更新する
 * @param project_id 
 * @param task_id 
 * @param key 
 * @param feeling 
 */
export const updateFeeling = (project_id:string, task_id:string, key:"after"|"before", feeling:feeling) => {
  const task_ref = database.ref(`projects/${project_id}/tasks/${task_id}/feelings/${key}`);
  task_ref.set(feeling);
}