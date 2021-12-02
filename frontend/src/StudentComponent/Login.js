import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Token } from "../Context/AuthContext";

function Login() {
  // eslint-disable-next-line
  const [auth, setAuth] = useContext(Token);

  const history = useHistory();

  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserLogin((prev) => ({ ...prev, [name]: value }));
  };

  //state for displaying error
  const [error, setError] = useState("");

  //login
  const hanldeSubmit = async (e) => {
    e.preventDefault();
    try {
      const deployedUrl = "https://student-task1.herokuapp.com/login";

      const response = await fetch(deployedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      const data = await response.json();

      // now do whatever you want with the data
      //console.log(data);
      //displaying error for 3 secs
      setError(data.error);
      setTimeout(() => {
        setError("");
      }, 3000);

      //console.log(data);
      //if we get authToken in response then we store it in local storage and redirect user to private route
      if (data.authToken) {
        localStorage.setItem("authToken", data.authToken);
        setAuth(true);
        history.push(`/login/${data.studentId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Welcome to our Home Page</h3>
      <form onSubmit={hanldeSubmit}>
        <h3>Login</h3>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              onChange={handleChange}
              name="email"
              value={userLogin.email}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              minLength="3"
              className="form-control"
              onChange={handleChange}
              name="password"
              value={userLogin.password}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p>{error} </p>
      <Link to="/forgotPassword">
        <button className="btn btn-primary my-3">Forgot Password</button>
      </Link>
      <div className="message"></div>
    </div>
  );
}

export default Login;
