import React from "react";
import "./css/App.css";
import "./css/style.css";
import Workouts from "./components/workouts";
import HomePage from "./components/homePage";
import Login from "./components/login";
import SignUp from "./components/signUp";
import { Switch, Route } from "react-router-dom";
import ViewWorkout from "./components/viewWorkout";
import workoutHistory from "./components/workoutHistory";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/workouts" component={Workouts} />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/myWorkout" component={ViewWorkout} />
        <Route path="/myWorkouts" component={workoutHistory} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
