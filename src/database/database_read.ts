import { projects, project } from './../lib/types';
import { database } from "../firebase_init";

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

/**
 * projectをlistenする(変更などあれば反映される)
 * @param project_id 
 * @param callback 
 */
export const fetchProject_on = async (project_id: string, callback: (project: project) => any) => {
  database.ref(`projects/${project_id}`).on("value", (snapshot) => {
    callback(snapshot.val());
  })
}


/**
 * userのproject_idsをlistenして、projectを取得
 * project_idsの変更のみ反映 (projectの内容変更は反映されない)
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
 * userのprojectsを取ってきてcallbackに渡す(get : 反映されない)
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
