import { task, project, feeling } from './../lib/types';
import { useCallback, useMemo } from "react";
import { database } from "../firebase_init";
import { useFetchData, useFetchAllData } from "./database_read";

const useSetData = (ref: firebase.default.database.Reference) => {
  const updateDatabase = useCallback(
    (data) => {
      ref.set(data);
    },
    [ref]
  );
  return updateDatabase;
};

export const useRegisterData = () => {
  const ref = database.ref();
  const setData = useSetData(ref);
  const { old_data }: any = useFetchAllData();

  const registerData = useCallback(
    (new_data) => {
      setData({ ...old_data, ...new_data });
    },
    [setData, old_data]
  );

  return registerData;
};

const useDatabaseRef = (path: string) => {
  return useMemo(() => database.ref(path), [path]);
};

export const useRegisterProject = (user: firebase.default.User) => {
  const users_ref = useDatabaseRef(`users/${user.uid}/projects`);
  let project_ids: any = useFetchData(users_ref).data;

  const projects_ref = useDatabaseRef("projects");
  const projects: any = useFetchData(projects_ref).data;
  const registerProject = useCallback(
    (new_project) => {
      console.log(project_ids);
      const new_project_id = projects_ref.push().key as string;
      /**
       * projectsに追加
       */
      projects[new_project_id] = new_project;
      projects_ref
        .set(projects)
        .then(() => console.log("project set secceeded"))
        .catch(() => console.log("set failed"));

      /**
       * usersに追加
       */
      project_ids[new_project_id] = true;
      users_ref.set(project_ids);
    },
    [users_ref, project_ids, projects, projects_ref]
  );
  return registerProject;
};

export const useRegisterTask = (project_id: string) => {
  const tasks_ref = useDatabaseRef(`projects/${project_id}/tasks`);
  const db_tasks = useFetchData(tasks_ref).data;
  const tasks: any = useMemo(() => {
    return db_tasks ?? {};
  }, [db_tasks]);
  const registerTask = useCallback(
    (new_task) => {
      const new_task_id = tasks_ref.push().key as string;
      tasks[new_task_id] = new_task;
      tasks_ref
        .set(tasks)
        .then(() => console.log("task registeration succeeded"))
        .catch(() => console.log("set failed"));
    },
    [tasks_ref, tasks]
  );

  return registerTask;
};

export const useSetTask = (project_id: string, task_id: string) => {
  const task_ref = database.ref(`projects/${project_id}/tasks/${task_id}`);
  const setTask = useCallback(
    (new_task) => {
      task_ref
        .set(new_task)
        .then(() => console.log("task set succeeded"))
        .catch(() => console.log("set failed"));
    },
    [task_ref]
  );
  return setTask;
};



/**
 * userがdatabaseに登録済みなら何もしない, まだなら登録する
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
 */
export const registerProject = (user: firebase.default.User,new_project:project) => {
  const new_projects_ref=database.ref("projects").push();
  new_projects_ref.set(new_project);
  const new_project_key =new_projects_ref.key;

  database.ref(`users/${user.uid}`).child("projects").child(new_project_key as string).set(true);
};


/**
 * taskを新しく登録する
 */
 export const registerTask = (project_id:string, new_task:task) => {
  const new_task_ref=database.ref(`projects/${project_id}/tasks`).push();
  new_task_ref.set(new_task);
};

export const updateTask = (project_id:string, task_id:string, key:string, value:any) => {
  const task_ref = database.ref(`projects/${project_id}/tasks/${task_id}/${key}`);
  task_ref.set(value);
}

export const updateFeeling = (project_id:string, task_id:string, key:"after"|"before", feeling:feeling) => {
  const task_ref = database.ref(`projects/${project_id}/tasks/${task_id}/feelings/${key}`);
  task_ref.set(feeling);
}