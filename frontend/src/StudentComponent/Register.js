import React from "react";
import { useState } from "react";

function Register() {
  const [userRegister, setuserRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserRegister((prev) => ({ ...prev, [name]: value }));
  };

  //post request to register user
  const hanldeSubmit = async (e) => {
    e.preventDefault();

    const localUrl = "http://localhost:3001/register";

    const response = await fetch(localUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegister),
    });

    const data = await response.json();
    setMessage(data.message);

    //after 2 secs it will disappear
    setTimeout(() => {
      setMessage("");
    }, 2000);

    // now do whatever you want with the data
    //console.log(data);
    setuserRegister({ name: "", email: "", password: "" });
  };

  return (
    <div>
      <form onSubmit={hanldeSubmit}>
        <h3> Register</h3>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              minLength="3"
              className="form-control"
              onChange={handleChange}
              name="name"
              value={userRegister.name}
            />
          </div>
        </div>
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
              value={userRegister.email}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              minLength="3"
              className="form-control"
              onChange={handleChange}
              name="password"
              value={userRegister.password}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* showing message to confirm data received from backend */}
      <div className="message">{message}</div>
    </div>
  );
}

export default Register;
