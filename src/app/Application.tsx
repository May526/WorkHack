import "./Application.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Todo from "./pages/todo/Todo";
import Mind from "./pages/mind/Mind";
import ProjectsContextProvider from "./contexts/ProjectsContext";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

export default function App() {
  let { path, url } = useRouteMatch();
  return (
    <ProjectsContextProvider>
      <Router>
        <div className="applicationWrapper">
          <Sidebar />
          <div className="rightPage">
            <Topbar />
            <Switch>
              <Route exact path={path}>
                <Home />
              </Route>
              <Route path={`${url}/todo`}>
                <Todo />
              </Route>
              <Route path={`${url}/mind`}>
                <Mind />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ProjectsContextProvider>
  );
}
