import "./App.css";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./StudentComponent/Login";
import Register from "./StudentComponent/Register";
import ForgotPass from "./StudentComponent/ForgotPass";
import Private from "./StudentComponent/Private";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import AdminLogin from "./AdminComponent/AdminLogin";
import AdminPrivate from "./AdminComponent/AdminPrivate";
import TaskSubmissions from "./AdminComponent/TaskSubmissions";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/forgotPassword" component={ForgotPass} />
          <Route exact path="/admin" component={AdminLogin} />

          {/* Protected Routes here */}
          <ProtectedRoute exact path="/login/:id" component={Private} />

          <ProtectedRoute exact path="/admin/:id" component={AdminPrivate} />
          <ProtectedRoute
            path="/admin/:id/tasksubmissions"
            component={TaskSubmissions}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
