import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import PaginateTable from "./common/paginateTable";
import PaginationBar from "./common/paginationBar";
import api from "../api/apis";
import "../css/App.css";
import { addToCart } from "../actions";

const Workouts = props => {
  //Workout states: exercise -> uses effect to populate valu
  const [exercises, setExercises] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterExercises, setFilterExercises] = useState({ search: "" });

  //Makes call to get all exercises
  useEffect(() => {
    async function fetchExercises() {
      const allExercises = await api.get("/exercise");
      setExercises(allExercises.data);
    }
    if (exercises.length === 1) fetchExercises();
  });

  //Function to Manage pagination
  const onPageChange = e => {
    //Update current page
    setCurrentPage(e.target.innerText);
  };

  //Function to add workout to cart (Using Redux to maintain applications state)
  const addExerciseToCart = ({ title, id }) => {
    props.addToCart({ id, title });
  };

  const handleSearch = e => {
    //reset page to page 1:
    setCurrentPage(1);
    //Set the filtered exercises
    setFilterExercises({
      ...filterExercises,
      search: e.target.value
    });
  };

  const filteredExercises = search => {
    const showExercises = exercises.filter(exercise => {
      if (_.startsWith(_.upperCase(exercise.title), _.upperCase(search)))
        return exercise;
    });
    return showExercises;
  };

  /* Top Bar for login and selecting item, Side bar, search bar, gallery of exercises */
  if (!exercises || exercises === undefined) return <div>"Loading...";</div>;

  const showExercises =
    filterExercises.search === ""
      ? exercises
      : filteredExercises(filterExercises.search);

  //Variables for pagination components
  const itemsPerPage = 5;
  const pages = Math.ceil(showExercises.length / itemsPerPage);
  return (
    <React.Fragment>
      <section className="searchBar">
        <div className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Search... "
            onChange={e => {
              handleSearch(e);
            }}
            value={filterExercises.search}
          />
          <button className="search__button">
            <FontAwesomeIcon icon={faSearch} className="search__icon" />
          </button>
        </div>
      </section>
      <section className="exercise">
        <table className="table">
          <thead>
            <tr className="table__heading">
              <th className="table__column">Title</th>
              <th className="table__column">Description</th>
              <th className="table__column">Difficulty</th>
              <th className="table__column">Primary</th>
              <th className="table__column">Secondary</th>
              <th className="table__column">Add</th>
            </tr>
          </thead>
          <tbody>
            <PaginateTable
              items={showExercises}
              count={itemsPerPage}
              currentPage={currentPage}
              onClick={e => {
                addExerciseToCart(e);
              }}
            />
          </tbody>
        </table>
        <PaginationBar
          count={pages}
          currentPage={currentPage}
          onPageChange={e => {
            onPageChange(e);
          }}
          totalItems={showExercises.length}
          itemsPerPage={itemsPerPage}
        />
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { cart: state.cart };
};

export default connect(mapStateToProps, { addToCart })(Workouts);
