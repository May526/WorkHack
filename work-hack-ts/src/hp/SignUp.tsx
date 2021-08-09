import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../auth/AuthProvider";
import Header from "./comp/Header";
import { Row, Col } from "reactstrap";
import { useRegisterUser } from "../database/database_write";
import { History } from "history";

const SignUp: React.FunctionComponent<{history:History}> = ({ history }) => {
  const { signup } :any= useContext(AuthContext);

  const registerUser = useRegisterUser();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const user = await signup(email.value, password.value, history);
    registerUser(user);
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
