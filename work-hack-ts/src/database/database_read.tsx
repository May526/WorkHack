/**
 * Realtime databaseの読み取りに関するもの
 */

import { useEffect, useState ,useMemo} from "react";
import { database } from "../firebase_init";

export const useFetchData = (ref:firebase.default.database.Reference) => {
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
