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

/*
  Based of of name attributes
  Data :
  {title: "ajdofj"}
  schema: 
  {title: joi.string.5char...etc}


*/

export const validateField = (data, schema) => {
  const { error } = Joi.validate(data, schema);
  if (!error) return null;
  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
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
