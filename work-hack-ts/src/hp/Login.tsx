import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Col, Row } from "reactstrap";
import Header from "./comp/Header";
import { AuthContext } from "../auth/AuthProvider";
import { useRegisterUser } from "../database/database_write";
import { History } from "history";

interface LoginPageProps {
  history : History
}

const Login : React.FunctionComponent<LoginPageProps> = ({history}) => {
  const { login } = useContext(AuthContext);

  const registerUser = useRegisterUser();

  const handleSubmit = async (event : any ) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const user = await login(email.value, password.value, history);
    registerUser(user);
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
