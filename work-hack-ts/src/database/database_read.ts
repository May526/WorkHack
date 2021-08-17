import { projects, project } from './../lib/types';
/**
 * Realtime databaseの読み取りに関するもの
 */

import { useEffect, useState, useMemo } from "react";
import { database } from "../firebase_init";

export const useFetchData = (ref: firebase.default.database.Reference) => {
  const [data, setData] = useState(undefined);
  useEffect(() => {

    ref.on('value', snapshot => {

      if (snapshot?.val()) {
        setData(snapshot.val());
      }
    });

    return () => {
      ref.off();
    };
  }, [ref]);
  return { data };
};

const useDatabase = () => {
  return useMemo(() => database.ref(), []);
};


export const useFetchAllData = () => {
  const root_ref = useDatabase();
  return useFetchData(root_ref);
};

/**
 * userのproject_idsをlistenする(変更などあれば反映される)
 * @param user 
 * @param callback 
 */
export const fetchProjectIDs_on = async (user: firebase.default.User, callback: (project_ids: string[]) => any) => {
  database.ref(`users/${user.uid}/projects`).on("value", async (snapshot) => {
    if (snapshot.val()) {
      const project_ids = Object.keys(snapshot.val());
      callback(project_ids);
    } else {
      callback([]);
    }
  })
}

export const fetchProject_on = async (project_id: string, callback: (project: project) => any) => {
  database.ref(`projects/${project_id}`).on("value", (snapshot) => {
    callback(snapshot.val());
  })
}


/**
 * userのprojectsをlistenする(変更などあれば反映される)
 * @param user 
 * @param callback 
 */
export const fetchProjects_on = async (user: firebase.default.User, callback: (projects: projects) => any) => {
  await database.ref(`users/${user.uid}/projects`).on("value", async (snapshot) => {
    if (snapshot.val()) {
      const project_ids = Object.keys(snapshot.val());
      const projects: projects = {};
      for (const project_id of project_ids) {
        const ss = await database.ref(`projects/${project_id}`).get();
        projects[project_id] = ss.val();
      }
      callback(projects)
    } else {
      callback({});
    }
  })
}

/**
 * userのprojectsを取ってきてcallbackに渡す(get)
 * @param user 
 * @returns 
 */
export const fetchProjects = async (user: firebase.default.User, callback: (projects: projects) => any) => {
  const project_ids_snapshot = await database.ref(`users/${user.uid}`).child("projects").get();
  if (project_ids_snapshot.exists()) {
    const project_ids = Object.keys(project_ids_snapshot.val());
    let projects: projects = {};
    for (const project_id of project_ids) {
      const project_snapshot = await database.ref(`projects/${project_id}`).get();
      projects[project_id] = project_snapshot.val();
    }
    callback(projects);
  } else {
    return {};
  }
}
