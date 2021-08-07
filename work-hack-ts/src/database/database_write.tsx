import { useCallback, useMemo } from "react";
import { database } from "../firebase_init";
import { useFetchData, useFetchAllData } from "./database_read";

const useSetData = (ref:firebase.default.database.Reference) => {
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
  const { old_data }:any = useFetchAllData();

  const registerData = useCallback(
    (new_data) => {
      setData({ ...old_data, ...new_data });
    },
    [setData, old_data]
  );

  return registerData;
};

const useDatabaseRef = (path:string) => {
  return useMemo(() => database.ref(path), [path]);
};

export const useRegisterProject = (user:firebase.default.User) => {
  const users_ref = useDatabaseRef(`users/${user.uid}/projects`);
  const project_ids:any = useFetchData(users_ref).data;

  const projects_ref = useDatabaseRef("projects");
  const projects:any = useFetchData(projects_ref).data;
  const registerProject = useCallback(
    (new_project) => {
      const new_project_id = projects_ref.push().key as string;
      /**
       * projectsに追加
       */
      projects[new_project_id] = new_project;
      projects_ref
        .set(projects)
        .then(() => console.log("set secceeded"))
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

export const useRegisterTask = (project_id:string) => {
  const tasks_ref = useDatabaseRef(`projects/${project_id}/tasks`);
  const db_tasks = useFetchData(tasks_ref).data;
  const tasks:any = useMemo(() => {
    return db_tasks ?? {};
  }, [db_tasks]);
  const registerTask = useCallback(
    (new_task) => {
      const new_task_id = tasks_ref.push().key as string;
      tasks[new_task_id] = new_task;
      tasks_ref
        .set(tasks)
        .then(() => console.log("set succeeded"))
        .catch(() => console.log("set failed"));
    },
    [tasks_ref, tasks]
  );

  return registerTask;
};

export const useSetTask = (project_id:string, task_id:string) => {
  const task_ref = database.ref(`projects/${project_id}/tasks/${task_id}`);
  const setTask = useCallback(
      
    (new_task) => {
      task_ref
        .set(new_task)
        .then(() => console.log("set succeeded"))
        .catch(() => console.log("set failed"));
    },
    [task_ref]
  );
  return setTask;
};

export const useRegisterUser = () => {
  const users_ref = database.ref("users");
  const users:any = useFetchData(users_ref).data;

  const registerUser = useCallback(
    (user)=>{
      if(user && !users.hasOwnProperty(user.uid)){  
        users[user.uid]={projects: {hoge:true}}
        users_ref.set(users)
        .then(()=> console.log("succeeded"))
        .catch(() => console.log("failed")) 
      }else{
        console.log("already exist")
      }
    }
  ,[users_ref,users])
  return registerUser
}
