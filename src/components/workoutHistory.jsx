import React from "react";
import { useEffect, useState } from "react";
import _ from "lodash";

import api from "../api/apis";
import ViewWorkoutHistory from "./viewWorkoutHistory";

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      //This need to get the Workout title and dates

      const workoutsResult = await api.get("/workouts");

      if (workoutsResult.status !== 200) return "";

      if (workoutsResult.data != undefined && workouts[0] == undefined) {
        setWorkouts(workoutsResult.data);
      }
    }

    fetchData();
  });

  const displayWorkouts = () => {
    return (
      <React.Fragment>
        <section className="history__header">
          <h2 className="heading-2">Workout History</h2>
        </section>
        <section className="history__content">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(workout => {
                const dateTempFormatted = _.split(workout.date, "T");
                const dateFormattedArray = _.split(dateTempFormatted[0], "-");
                const dateFormatted = dateFormattedArray[1].concat(
                  "/",
                  dateFormattedArray[2] + "/",
                  dateFormattedArray[0]
                );
                const url = "/myWorkouts/?" + workout._id + "/#popup_history";
                return (
                  <tr>
                    <td>
                      <a href={url}>{workout.name}</a>
                    </td>
                    <td>{dateFormatted}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <ViewWorkoutHistory />
      </React.Fragment>
    );
  };

  return <React.Fragment>{displayWorkouts()}</React.Fragment>;
};

export default WorkoutHistory;
