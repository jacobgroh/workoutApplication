export const addToCart = exercise => {
  return {
    type: "ADD_TO_CART",
    payload: exercise
  };
};

export const setWorkoutFromCart = cart => {
  //Here will take in a array of objects with id's of the workout to load
  //
};
