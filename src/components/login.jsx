import React from "react";

const login = () => {
  return (
    <React.Fragment>
      <div className="login__container">
        <form action="" className="login__form">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" className="login__form__username" />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            className="login__form__password"
          />
          <button className="btn">Login</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default login;
