import React from "react";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import PlansPage from "./components/plans/PlansPage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Plan from "./components/plans/Plan";


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation></Navigation>
        <div className="app-content-container">
          <div className="app-content">
            <Switch>

              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/signup">
                <Signup></Signup>
              </Route>
              <Route path="/plans">
                <PlansPage></PlansPage>
              </Route>
              <Route path="/plan/:id" component={Plan}>
              </Route>
            </Switch>
          </div>
        </div >

      </Router>
    </div>
  );
}

export default App;
