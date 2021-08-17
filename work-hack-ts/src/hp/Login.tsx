import React from "react";
import { withRouter } from "react-router";
import { Col, Row } from "reactstrap";
import Header from "./comp/Header";
import { registerUser } from "../database/database_write";
import { History } from "history";
import { login } from "../auth/Auth";

const Login: React.FunctionComponent<{ history: History }> = ({ history }) => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const user = await login(email.value, password.value, history);
    if (user) {
      registerUser(user);
    }
  };

  return (
    <Row>
      <Col xs="2">
        <Header />
      </Col>
      <Col>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Log in</button>
        </form>
      </Col>
    </Row>
  );
};

export default withRouter(Login);
