import React from "react";
import {Nav,NavItem} from "reactstrap";
import {Link} from "react-router-dom";

export default function Header() {
  return (
    <Nav vertical className="position-fixed">
      <NavItem>
        <Link className="nav-link" to="/">HP</Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/login">login</Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/signup">sign up</Link>
      </NavItem>
    </Nav>
  );
}
