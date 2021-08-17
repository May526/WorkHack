import React, { createContext, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { fetchProjectIDs_on } from "../../database/database_read";

export const ProjectsContext = createContext<string[]>([]);

const ProjectsContextProvider:React.FC = ({children}) => {
  const currentUser = useContext(AuthContext);

  const [project_ids, setProjectIds] = useState<string[]>([]);
  useEffect(()=>{
    fetchProjectIDs_on(currentUser as firebase.default.User,setProjectIds)
    }
  ,[currentUser])


  console.log("render: ProjectsContexts.tsx");
  console.log("projects: ",project_ids);
  return (
    <ProjectsContext.Provider
      value={
        project_ids
      }
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
