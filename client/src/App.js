import React from 'react';
import Navbar from './layouts/Navbar';
import Home from './views/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from "./views/Login"
import Register from "./views/Register"
import Posts from './views/Posts'
import PublicRoute from './components/HigherOrderComponents/PublicRoute'
import PrivateRoute from './components/HigherOrderComponents/PrivateRoute'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} ></Route>
          <div id="about" class="about section container " >
            {/* <PrivateRoute roles={["user" , "admin"]} component={Posts} path='/posts' /> */}
            <PublicRoute path="/login" component={Login} ></PublicRoute>
            <PublicRoute path="/register" component={Register} ></PublicRoute>
            <PrivateRoute path="/posts" roles={["user" , "admin"]}  component={Posts} ></PrivateRoute>
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
