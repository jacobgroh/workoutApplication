import React from "react";
import { Link } from "react-router-dom";

import CreateWorkoutForm from "./createWorkoutForm";

const SideBar = () => {
  return (
    <React.Fragment>
      <section className="sidebar">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <a href="#popup" className="link link--white">
              Create an exercise
            </a>
          </li>
          <li className="sidebar__item">
            <Link to="/workouts/#" className="link link--white">
              Add Exercise
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to="/myWorkout" className="link link--white">
              View Workout
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to="/myWorkouts" className="link link--white">
              View Workout History
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to="/workouts/#" className="link link--white">
              Use a Workout Template
            </Link>
          </li>
          <li className="sidebar__item"> Created By Jake Groh</li>
        </ul>
      </section>
      <CreateWorkoutForm />
    </React.Fragment>
  );
};

export default SideBar;
