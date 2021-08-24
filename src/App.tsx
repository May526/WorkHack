import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Application from "./app/Application";
import Login from "./hp/Login";
import SignUp from "./hp/SignUp";
import Homepage from "./hp/Homepage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute path="/app/" component={Application} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Homepage} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
