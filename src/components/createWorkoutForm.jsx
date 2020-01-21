import React, { useState } from "react";
import api from "../api/apis";
import Input from "./common/input";
import Joi from "joi-browser";
import { useRef } from "react";
import useFormHandler from "./hooks/useFormHandler";
import { validateForm } from "./common/formUtils";
const fields = [
  {
    name: "title",
    type: "text",
    inputClass: "form__title",
    labelContent: "Title: "
  },
  {
    name: "description",
    type: "text",
    inputClass: "form__description",
    labelContent: "Description: "
  },
  {
    name: "difficulty",
    type: "text",
    inputClass: "form__difficulty",
    labelContent: "Difficulty (1-5) "
  },
  {
    name: "primary",
    type: "text",
    inputClass: "form__primary",
    labelContent: "Primary Muscles (comma seperated) "
  },
  {
    name: "secondary",
    type: "text",
    inputClass: "form__secondary",
    labelContent: "Secondary Muscles (comma seperated) "
  }
];

const CreateWorkoutForm = () => {
  const closeTag = useRef(null);
  const { values, handleChange } = useFormHandler({
    title: "",
    description: "",
    difficulty: "",
    primary: "",
    secondary: ""
  });

  const [errors, setErrors] = useState({});

  /*
    Refactor : 
      1. Need to find out how to go back without page reload
      2. Need to handle errors and post to users
  */
  const handleSubmit = async (e, values) => {
    e.preventDefault();
    const errors = validateForm(values, schema);

    console.log(errors);
    if (!errors) {
      await api.post("/exercise", values);
      closeTag.current.click();
    } else {
      setErrors(errors);
    }
  };

  const schema = {
    title: Joi.string()
      .required()
      .label("title"),
    difficulty: Joi.number()
      .min(1)
      .max(5)
      .required()
      .label("difficulty"),
    description: Joi.string()
      .min(5)
      .required()
      .label("description"),
    primary: Joi.string()
      .required()
      .label("primary"),
    secondary: Joi.string()
      .required()
      .label("secondary")
  };

  return (
    <section className="popup" id="popup">
      <div className="popup__content">
        <a href="#" ref={closeTag} className="popup__close">
          &times;
        </a>

        <form
          onSubmit={e => {
            handleSubmit(e, values);
          }}
          className="form__workout"
        >
          {fields.map(field => {
            const { name, InputClass, type, labelContent } = field;
            return (
              <Input
                inputId={name}
                name={name}
                inputClass={InputClass}
                inputType={type}
                labelContent={labelContent}
                onChange={e => {
                  errors[e.target.name] = "";
                  handleChange(e);
                }}
                value={values[name]}
                error={errors[name]}
              />
            );
          })}
          <input
            type="submit"
            value="Create Exercise"
            className="form__workout__submit"
          />
        </form>
      </div>
    </section>
  );
};

export default CreateWorkoutForm;
