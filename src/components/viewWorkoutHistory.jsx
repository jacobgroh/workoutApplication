import React from "react";
import { useEffect, useState } from "react";
import api from "../api/apis";

import _ from "lodash";

const ViewWorkoutHistory = () => {
  const [fullWorkout, setFullWorkout] = useState({});
  useEffect(() => {
    console.log(window.location.href);
    const array = _.split(window.location.href, "/");
    const idArray = _.split(array[4], "?");
    const id = idArray[1];

    async function fetchData() {
      const { data } = await api.get(`/workouts/full/${id}`);
      //Call method in workout that returns the whole workout object
      console.log(data);
      if (data != undefined && Object.keys(fullWorkout).length === 0)
        setFullWorkout(data);
    }

    fetchData();
  });

  const displayWorkout = () => {
    const displayRep = (reps, showReps, showWeight) => {
      const displayRep = (rep, showWeight) => {
        console.log("look here", reps);
        console.log(rep._id);
        return (
          <React.Fragment>
            <li className="view__workout--list">Rep: {rep.rep}</li>
            {showWeight ? (
              <li className="view__workout--list">Weight: {rep.weight}</li>
            ) : (
              ""
            )}
          </React.Fragment>
        );
      };

      return (
        <React.Fragment>
          {reps.map((rep, index) => {
            return showReps || index == 0 ? displayRep(rep, showWeight) : "";
          })}
        </React.Fragment>
      );
    };
    if (fullWorkout.workout == undefined) return "";
    const { showReps, showWeight } = fullWorkout.workout;
    console.log("full workout", fullWorkout);
    return (
      <React.Fragment>
        <h2 className="heading-2 ">{fullWorkout.workout.name}</h2>
        {fullWorkout.records.map(record => {
          return (
            <ul className="view__workout__container">
              <li className="view__workout--list">{record.title}</li>
              {displayRep(record.reps, showReps, showWeight)}
            </ul>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <section className="popup" id="popup_history">
      <div className="popup__content">
        <a href="/myWorkouts" className="popup__close">
          &times;
        </a>

        <div className="view__workout">{displayWorkout()}</div>
      </div>
    </section>
  );
};

export default ViewWorkoutHistory;
