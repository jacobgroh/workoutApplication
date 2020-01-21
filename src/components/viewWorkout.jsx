import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import _ from "lodash";

import api from "../api/apis";
import useFormHandler from "./hooks/useFormHandler";
import Input from "./common/input";
import history from "../history";

const ViewWorkout = props => {
  const [showRep, setShowReps] = useState(false);
  const [showWeight, setShowWeights] = useState(false);

  const [exercises, setExercises] = useState([]);
  const [reps, setReps] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let buildExercises = [];
    props.cartItems.map((item, idx) => {
      const title = item.title;

      /*
        Create object of exercises with sets, 
        For each set, have a rep-weight entity that is assigned to it
      */
      buildExercises = [
        ...buildExercises,
        (buildExercises[idx] = { title, sets: 3 })
      ];
    });
    //Set exercises
    if (buildExercises.length > 0 && exercises[0] == undefined)
      setExercises([...buildExercises]);

    //Building Reps State for each exercise
    let arrayOfReps = [];
    exercises.map((item, index) => {
      /*
                  [
                    0:[               // exercise its on
                      rep1: {
                        rep: 8,
                        weight: ""
                             },       //
                      rep-2: {
                        rep: 8,
                        weight : ""
                      }
                    ]
                  ]
              */

      // item.sets is the number of times it should add a rep object
      let reps = [];
      if (exercises.length != 0) {
        const repObject = { rep: "", weight: "" };
        _.times(item.sets, idx => {
          const rep = "rep-" + idx;
          reps[rep] = repObject;
        });
      }
      arrayOfReps[index] = reps;
    });

    // Set Reps Object
    if (arrayOfReps.length > 0 && reps[0] == undefined)
      setReps([...arrayOfReps]);
  });

  const handleFormSubmit = e => {
    e.preventDefault();

    const handleAjax = async (e, exercises, reps) => {
      // Send Ajax request to Create a new Workout (name and date)
      const workoutName = values.workoutName;
      var date = new Date();
      var day = String(date.getDate()).padStart(2, "0");
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var year = date.getFullYear();
      date = month + "/" + day + "/" + year;
      let body = {
        name: workoutName,
        date: date,
        showReps: showRep,
        showWeight: showWeight
      };

      const workoutResult = await api.post("/workout", body);
      if (workoutResult.status !== 201) {
        console.log("Error creating workout");
        return;
      }

      // Keep Track of Workout id
      const workoutId = workoutResult.data._id;
      // Loop through the exercises
      exercises.map(async (exercise, index) => {
        //For each exercise, send an Ajax request to create a new exercise record.
        body = {
          title: exercise.title,
          sets: exercise.sets,
          workout_id: workoutId
        };
        const exerciseRecordResult = await api.post("/exerciseRecord", body);

        if (exerciseRecordResult.status !== 201) {
          return;
        }
        //Keep track of the exercise Id
        const exerciseRecordId = exerciseRecordResult.data._id;

        //For each Set create a rep for the  in the exercise:
        _.times(exercise.sets, async idx => {
          //target rep to create
          const rep = "rep-" + idx;
          let body = reps[index][rep];
          body.exerciseRecord = exerciseRecordId;

          //Send a ajax request to create a new Rep object connecting it to set
          const repResult = await api.post("/repRecord", body);
          if (repResult.status !== 201) return;
        });
      });
    };

    //Run above code:
    handleAjax(e, exercises, reps);

    history.push("/myWorkouts");
  };

  const handleExerciseChange = ({ target: { name, value, id: index } }) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][name] = value;
    setExercises(updatedExercises);
  };

  const handleRepChange = ({ target: { name, value, id: index } }) => {
    let split = _.split(index, "-");
    const exerciseIndex = split[0];
    const repIndex = split[1] + "-" + split[2];

    // Refactor
    // // if show reps is not checked change all reps to value of first
    // if (!showRep) {
    //   const updateReps = [...reps];
    //   // let repValues = updateReps[exerciseIndex];
    //   // console.log("rep Values: ", repValues);
    //   // console.log(repValues.length);
    //   updateReps[exerciseIndex].map(item => {
    //     console.log("iterative: ", item);
    //     item.rep = value;
    //   });
    //   // console.log(repValues);
    //   console.log(updateReps);
    //   setReps(updateReps);
    //   return;
    // }

    /// if show reps is checked, only change specific rep
    const updatedReps = [...reps];

    let body;
    //This method handles both rep and weight changes
    const checkForWeight = _.split(index, "-").length > 3 ? true : false;
    if (!checkForWeight) {
      body = { ...updatedReps[exerciseIndex][repIndex], rep: value };
    } else {
      body = { ...updatedReps[exerciseIndex][repIndex], weight: value };
    }
    updatedReps[exerciseIndex][repIndex] = body;

    setReps(updatedReps);
  };

  const displayWeights = (component, exerciseIdx, repIdx) => {
    let repIndex = "rep-" + repIdx;

    // if !showWeight, target first rep (or all)
    if (!showWeight) repIndex = "rep-0";

    const weightValue =
      reps[exerciseIdx] && reps[exerciseIdx][repIndex]
        ? reps[exerciseIdx][repIndex].weight
        : "";

    component.push(
      <Input
        inputId={exerciseIdx + "-" + repIndex + "-" + repIdx}
        inputClass="cart__item--weight"
        inputType="text"
        labelContent="Weight: "
        name="weight"
        value={weightValue}
        onChange={e => {
          handleRepChange(e);
        }}
      />
    );
  };
  const displayReps = idx => {
    const sets = exercises[idx].sets;

    const numReps = showRep ? sets : 1;

    let showReps = [];

    _.times(numReps, index => {
      const repIndex = "rep-" + index;

      const repValue =
        reps[idx] && reps[idx][repIndex] ? reps[idx][repIndex].rep : "";

      showReps.push(
        <Input
          inputId={idx + "-" + repIndex}
          inputClass="cart__item--rep"
          inputType="text"
          labelContent="Reps: "
          name={repIndex}
          value={repValue}
          onChange={e => {
            handleRepChange(e);
          }}
        />
      );
      if (showWeight) displayWeights(showReps, idx, index);
    });

    if (!showWeight && !showReps) displayWeights(showReps, idx, "0");

    return <div className="cart__item--container">{showReps}</div>;
  };

  const displaySets = idx => {
    const setNum = idx;
    return (
      <React.Fragment>
        <div className="cart__item--container">
          <Input
            inputId={setNum}
            inputClass="cart__item--set"
            inputType="text"
            labelContent="Sets: "
            name="sets"
            value={exercises[idx].sets}
            onChange={e => {
              handleExerciseChange(e);
            }}
          />
        </div>
        {displayReps(idx)}
      </React.Fragment>
    );
  };
  const displayTitle = ({ title }) => {
    return <div className="cart__item--title">{title}</div>;
  };

  const { values, handleChange } = useFormHandler({
    workoutName: ""
  });

  const displayName = () => {
    return (
      <div className="cart__form--title">
        <Input
          inputId="workoutName"
          name="workoutName"
          inputClass="cart__form--title--field"
          inputType="text"
          labelContent="Workout Title: "
          onChange={e => {
            errors[e.target.name] = "";
            handleChange(e);
          }}
          value={values["workoutName"]}
          error={errors["workoutName"]}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <section className="cart__options">
        <ul className="cart__options__list">
          <li className="cart__options__item">
            <label htmlFor="weights" className="weigth">
              Show Weigths
            </label>
            <input
              type="checkbox"
              id="weights"
              className="cart__checkbox"
              onClick={e => {
                setShowWeights(e.target.checked);
              }}
            />
          </li>
          <li className="cart__options__item">
            <label htmlFor="reps" className="rep">
              Seperate Reps
            </label>
            <input
              type="checkbox"
              id="reps"
              onClick={e => {
                setShowReps(e.target.checked);
              }}
              className="cart__checkbox"
            />
          </li>
        </ul>
      </section>
      <section className="cart__exercises">
        <h2 className="heading-2 cart__header">My Workout: </h2>
        <form
          onSubmit={e => {
            handleFormSubmit(e);
          }}
          className="cart__item--form"
        >
          <ul className="cart__list ">
            <li className="cart__item">{exercises && displayName()}</li>
            {exercises.map((item, idx) => {
              return (
                <li className="cart__item">
                  {/* <div className="cart_item--form"> */}
                  {displayTitle(item)}
                  {displaySets(idx)}
                  {/* </div> */}
                </li>
              );
            })}
            <li className="cart__submit">
              <input type="submit" value="Save Workout" />
            </li>
          </ul>
        </form>
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { cartItems: state.cart };
};

export default connect(mapStateToProps)(ViewWorkout);
