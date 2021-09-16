import "./Sidebar.css";
import { Home, FormatListBulleted, Poll } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { logout } from "../../../auth/Auth";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarTop">
          <div className="sideTitle">Work Hack</div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">TRACK</h3>
            <ul className="sidebarList">
              <Link to="/app" className="link">
                <li className="sidebarListItem active">
                  <Home className="sidebarIcon" />
                  Home
                </li>
              </Link>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">PLAN</h3>
            <ul className="sidebarList">
              <Link to="/app/todo" className="link">
                <li className="sidebarListItem">
                  <FormatListBulleted className="sidebarIcon" />
                  To Do
                </li>
              </Link>
              {/* <Link to="/app/goal" className="link">
                <li className="sidebarListItem">
                  <PieChart className="sidebarIcon" />
                  Goal
                </li>
              </Link> */}
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">ANALYZE</h3>
            <ul className="sidebarList">
              <Link to="/app/mind" className="link">
                <li className="sidebarListItem">
                  <Poll className="sidebarIcon" />
                  Summary
                </li>
              </Link>
            </ul>
          </div>
          <Button size="sm" onClick={logout}>
            log out
          </Button>
        </div>
        <div className="sidebarBottom">
          <div className="sidebarBottomtext">xxxx xxx</div>
          <img src="/avator.jpg" alt="" className="sidebarBottomAvatar" />
        </div>
      </div>
    </div>
  );
}
