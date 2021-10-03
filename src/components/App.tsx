import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Login from "./Login";
import "./../styles/App.css";
import { LOGIN_TOKEN } from "../constants";
import { Rooms } from "./Rooms";

const App = () => {
  const loginToken = localStorage.getItem(LOGIN_TOKEN);
  console.log(loginToken);
  return (
    <div>
      {loginToken && <p>{loginToken} está logado</p>}
      <div>
        <Link to="/login">Login</Link>
      </div>

      <div>
        <Link to="/rooms">Salas</Link>
      </div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/rooms" component={Rooms} />
      </Switch>
    </div>
  );
};

export default App;
