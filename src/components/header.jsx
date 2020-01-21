import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Header = ({ count }) => {
  var logo = require("../images/logo.png");
  return (
    <section className="workout__header">
      <div className="workout__header__links">
        <div className="logo-box">
          <img
            src={logo}
            alt="logo"
            style={{ top: "2rem" }}
            className="logo u-padding-b-s"
          />
        </div>
        <div className="workout__header__buttons">
          <Link to="/myWorkout">
            <FontAwesomeIcon
              id="shopping__cart"
              icon={faShoppingCart}
              className="shoppingCart fa-4x"
            />
            {count != 0 && <span className="shoppingCart--value">{count}</span>}
          </Link>
          <Link to="/" className="btn btn--primary__link">
            Logout
          </Link>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return { count: state.cart.length };
};

export default connect(mapStateToProps)(Header);
