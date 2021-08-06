import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

import { Col, Container, Nav, NavItem, Row, Button } from "reactstrap";

import Home from "./Home";
import Todo from "./Todo";
import Setting from "./Setting";
import Goal from "./Goal";
import Mind from "./Mind";
import ProjectsContextProvider from "./contexts/ProjectsContext";

export default function App() {
  let { path, url } = useRouteMatch();
  const { logout } = useContext(AuthContext);
  return (
    <ProjectsContextProvider>
      <Router>
        <Container fluid>
          <Row>
            <Col xs={2}>
              <Nav vertical className="position-fixed">
                <NavItem>
                  <Link className="nav-link" to={`${url}`}>
                    Home
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to={`${url}/todo`}>
                    Todo
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to={`${url}/goal`}>
                    Goal
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to={`${url}/mind`}>
                    Mind
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to={`${url}/setting`}>
                    Setting
                  </Link>
                </NavItem>
                <NavItem>
                  <Button size="sm" onClick={logout}>
                    log out
                  </Button>
                </NavItem>
              </Nav>
            </Col>
            <Col>
              <Switch>
                <Route exact path={path}>
                  <Home />
                </Route>
                <Route path={`${url}/todo`}>
                  <Todo />
                </Route>
                <Route path={`${url}/goal`}>
                  <Goal />
                </Route>
                <Route path={`${url}/mind`}>
                  <Mind />
                </Route>
                <Route path={`${url}/setting`}>
                  <Setting />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </ProjectsContextProvider>
  );
}
