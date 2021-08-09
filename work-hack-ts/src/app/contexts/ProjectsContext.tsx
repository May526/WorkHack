/**
 * applicationでcontextに置いておきたいものは全部ここ
 */

import React, { createContext, useCallback, useContext, useMemo } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { useFetchAllData } from "../../database/database_read";
import {KeyObjToList} from "../../lib/convertTypes";

export const ProjectsContext = createContext("");

const ProjectsContextProvider:React.FC = ({children}) => {
  const { currentUser }:any = useContext(AuthContext);
  const { data }:any = useFetchAllData();
  const projects = useMemo(() => {
    return data
      ? Object.keys(data.users[currentUser.uid].projects).map((project_id) => {
          return { ...data.projects[project_id], project_id: project_id };
        })
      : [];
  }, [data, currentUser]);
  const null_project = useMemo(() => {
    return {
      name: "",
      tasks: {},
      member: Object.fromEntries([[currentUser.uid, true]]),
    };
  }, [currentUser]);

  const NullFeeling = useMemo(() => {
    return {
      energy: 5,
      pleasantness: 5,
    };
  }, []);

  const NullTask = useMemo(() => {
    return {
      name: "",
      point: 0,
      deadline: "",
      is_ongoing: false,
      started_at: "",
      estimated_time:"",
      is_completed: false,
      completed_at: "",
      subtasks: {},
      feeling: {
        before: {
          energy: -1,
          pleasantness: -1,
        },
        after: {
          energy: -1,
          pleasantness: -1,
        },
      },
    };
  }, []);


  const extractTasksFromProject = useCallback(
    (project, indicator_func_task) => {
      if (project.tasks) {
        let tasks_array = KeyObjToList(project.tasks ,"task_id");
        return tasks_array.filter(indicator_func_task);
      }
      return [];
    },
    []
  );

  
  const extractTasksFromProjects = useCallback(
    (indicator_func_task) => {
      let ret:any = [];
      for (let pi = 0; pi < projects.length; pi++) {
        let tasks = extractTasksFromProject(projects[pi], indicator_func_task);
        ret = ret.concat(tasks);
      }
      return ret;
    },
    [projects, extractTasksFromProject]
  );

  const extractTasksFromEachProject = useCallback(
  (indicator_func_task) => {
    const copy = JSON.parse(JSON.stringify(projects));
    for (let pi = 0; pi < copy.length; pi++) {
      copy[pi]["tasks"] = extractTasksFromProject(
        copy[pi],
        indicator_func_task
      );
    }
    return copy;
  },[projects,extractTasksFromProject]);

  const getTasks = useCallback(
    (project_id) => {
      return data.projects[project_id].tasks;
    },
    [data]
  );
  return (
    <ProjectsContext.Provider
      value={{
        null_project,
        projects,
        getTasks,
        NullTask,
        NullFeeling,
        extractTasksFromProjects,
        extractTasksFromEachProject,
      } as any}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
