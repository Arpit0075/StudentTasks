import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="mx-5">
        Zen Class is one stop for all web developement education.
      </h1>

      <div className="container-home">
        <div className="container-home-left my-5">
          <p className="my-5 text-white">
            Revive Your Developer Career. With Confidence. Earn up to ₹ 30,000
            scholarship Build internship-grade development-projects Learn Full
            Stack development or Backend development hands-on Grow your career
            with real work experience
          </p>

          <p className="my-5 text-white">
            Unlike regular courses, hands-on, project-led learning is at the
            heart of everything you do at Crio. Land top full stack developer or
            backend developer jobs with real work experience in key skills by
            working on internship-grade development projects.
          </p>
          <p className="my-5 text-white">
            “Education is not the filling of a pail, but the lighting of a
            fire.” ― W.B. Yeats
          </p>
          <p className="my-5 text-white">
            <span className="login-info">This is student login Page.</span> You
            will be able to login and register thourgh the below links. You will
            be able to access your Zen portal. You will be able to get details
            about the tasks and will be able to submit them. If you are facing
            any issues in registering or login , please feel free to contact us
            . We will definitely resolve it as soon as possible.
          </p>

          <button type="button" className="btn btn-light mx-2">
            <Link to="/login" className="btn btn-light" aria-current="page">
              Login
            </Link>
          </button>

          <button type="button" className="btn btn-light">
            <Link to="/register" className="btn btn-light" aria-current="page">
              Register
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
