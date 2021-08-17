import React from "react";
import { withRouter } from "react-router";
import Header from "./comp/Header";
import { Row, Col } from "reactstrap";
import { registerUser } from "../database/database_write";
import { History } from "history";
import { signup } from "../auth/Auth";

const SignUp: React.FunctionComponent<{ history: History }> = ({ history }) => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const user = await signup(email.value, password.value, history);
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
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </Col>
    </Row>
  );
};

export default withRouter(SignUp);
