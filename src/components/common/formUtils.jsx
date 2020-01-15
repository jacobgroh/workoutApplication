import Joi from "joi-browser";

export const validate = (data, schema) => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(data, schema, options);

  if (!error) return null;

  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};

export const formSubmit = (data, schema) => {
  const errors = { error: "length" };
  //const errors = this.validate(data, schema);
  return errors;
};

export const validateForm = (data, schema) => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(data, schema, options);
  if (!error) return null;
  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};

// handleChange = ({ currentTarget: input }) => {
//   const errors = { ...this.state.errors };
//   const errorMessage = this.validateProperty(input);

//   if (errorMessage) errors[input.name] = errorMessage;
//   else delete errors[input.name];

//   const data = { ...this.state.data };
//   data[input.name] = input.value;
//   this.setState({ data, errors });
// };

// Validate function

// On Submit function that calls validate function

//export default formUtils;
