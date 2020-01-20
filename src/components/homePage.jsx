import React from "react";
import { Link } from "react-router-dom";
import lean from "../images/lean.jpg";
import bulk from "../images/bulk.jpg";
import massive from "../images/massive.jpg";
import profile1 from "../images/profile_pic-1.png";
import profile2 from "../images/profile-pic_2.jpg";
import gymVid1 from "../images/gym-vid.jpg";
import gymVid2 from "../images/gym-vid.mp4";
import demoVid1 from "../images/Basic-demo.mp4";
import cardio from "../images/cardio.jpg";
import flexible from "../images/strech.jpg";
import weight from "../images/weight.jpg";
import crossfit from "../images/crossfit.jpg";

const HomePage = () => {
  var logo = require("../images/logo.png");
  return (
    <React.Fragment>
      <section className="nav">
        <input type="checkbox" id="nav-toggle" className="nav__checkbox" />
        <label htmlFor="nav-toggle" className="nav__button">
          <span className="nav__icon">&nbsp;</span>
        </label>
        <div className="nav__background">&nbsp;</div>
        <nav className="nav__menu">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="/#" className="nav__link">
                Demo Video
              </a>
            </li>
            <li className="nav__item">
              <a href="/#" className="nav__link">
                Workout Types
              </a>
            </li>
            <li className="nav__item">
              <a href="/#" className="nav__link">
                Reviews
              </a>
            </li>
            <li className="nav__item">
              <a href="/#" className="nav__link">
                Goals
              </a>
            </li>
            <li className="nav__item">
              <a href="/#" className="nav__link">
                Sign In
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <section className="header">
        <header className="primary-header">
          <div className="logo-box">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="primary-header-box">
            <h3 className="primary-header-box-text animate-top">
              Track and Share Your Dynamic Workouts!
            </h3>
            <div className="primary-header__buttons">
              <Link to="/login" className="btn btn--green animate-left">
                Sign In
              </Link>
              <Link to="/SignUp" className="btn btn--green animate-left">
                Sign Up
              </Link>
            </div>
          </div>
        </header>
      </section>
      <section className="demo">
        <h2 className="heading-2">
          This Video Demos The whole sites features and functionality!!!
        </h2>
        <div className="video__container">
          <div className="bg-video">
            <video className="bg-video__content" controls>
              <source src={demoVid1} type="video/mp4"></source>
              Your browser is not supported
            </video>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="gallery__type--1">Flexibility</div>
        <img src={flexible} alt="Flexible Img" className="gallery__img--1" />
        <div className="gallery__type--2">Cardiovascular</div>
        <img src={cardio} alt="Flexible Img" className="gallery__img--2" />
        <div className="gallery__type--3">Weight Training</div>
        <img src={weight} alt="Flexible Img" className="gallery__img--3" />
        <div className="gallery__type--4">Crossfit</div>
        <img src={crossfit} alt="Flexible Img" className="gallery__img--4" />
      </section>
      <section className="community">
        <div className="review">
          <div className="review__ranking">Rating: 4/5</div>
          <figure className="review__shape">
            <img src={profile1} className="review__img" alt="profile"></img>
          </figure>
          <div className="review__comment">
            This has helped me track my improvements and create well defined
            workouts.
          </div>
          <div className="review__author">--Trent Sallee</div>
        </div>
        <div className="review">
          <div className="review__ranking">Rating: 4/5</div>
          <figure className="review__shape">
            <img src={profile2} className="review__img" alt="profile "></img>
          </figure>
          <div className="review__comment">
            This has helped me track improvements and create well defined
            workouts.
          </div>
          <div className="review__author">--Maddie Kline</div>
        </div>
      </section>
      <section className="goals">
        <div className="bg-video--opa">
          <video className="bg-video--opa__content" muted loop autoPlay>
            <source src={gymVid2} type="video/mp4"></source>
            <source src={gymVid1} type="video/jpg"></source>
            Your browser is not supported
          </video>
        </div>
        <h2 className="heading-2 colored-text goals__title">
          Follow template workouts to get the body you want!
        </h2>
        <div className="card">
          <div className="card__title">Get Lean</div>
          <img src={lean} alt="Lean Muscle" className="card__img" />
          <div className="card__description">
            Be thin and strong with this workout plan!
          </div>
          <ul className="card__list">
            <li className="card_item">3-4 Sets</li>
            <li className="card_item">6-8 Reps</li>
            <li className="card_item">70% weight</li>
            <li className="card_item">1-1.5 hours</li>
            <li className="card_item">2500 calories</li>
            <li className="card_item">Work Hard!</li>
          </ul>
        </div>
        <div className="card">
          <div className="card__title">Gain Strength</div>
          <img src={bulk} alt="Bulk Muscle" className="card__img" />
          <div className="card__description">
            Gain bulk and strength with this workout plan!
          </div>
          <ul className="card__list">
            <li className="card_item">4-5 Sets</li>
            <li className="card_item">4-6 Reps</li>
            <li className="card_item">80% weight</li>
            <li className="card_item">1.5 hours</li>
            <li className="card_item">3000 calories</li>
            <li className="card_item">Push hard!</li>
          </ul>
        </div>
        <div className="card">
          <div className="card__title">Be Massive</div>
          <img src={massive} alt="Massive Muscle" className="card__img" />
          <div className="card__description">
            Get the linemen body. Able to crash through anything!
          </div>
          <ul className="card__list">
            <li className="card_item">4-5 Sets</li>
            <li className="card_item">2-4 Reps</li>
            <li className="card_item">90% weight</li>
            <li className="card_item">1.5-2 hours</li>
            <li className="card_item">3500 calories</li>
            <li className="card_item">Push hard!</li>
          </ul>
        </div>
      </section>
      <section className="footer">
        <div className="footer--content">
          {/* table with two rows */}
          <div className="row">
            <div className="col-1-of-2">
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="/#" className="footer__link">
                    Contact Us
                  </a>
                </li>
                <li className="footer__item">
                  <a href="/#" className="footer__link">
                    View Pricing
                  </a>
                </li>
                <li className="footer__item">
                  <a href="/#" className="footer__link">
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-1-of-2">
              Created by Jake Groh. This webpage was built with CSS using React.
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default HomePage;
