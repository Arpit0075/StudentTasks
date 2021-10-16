import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function AdminLogin() {
  let history = useHistory();

  const [adminLogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminLogin((prev) => ({ ...prev, [name]: value }));
  };

  //state for displaying error
  const [error, setError] = useState("");

  //login
  const hanldeSubmit = async (e) => {
    e.preventDefault();

    try {
      const localUrl = "http://localhost:3001/adminLogin";

      const response = await fetch(localUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminLogin),
      });

      const data = await response.json();

      // now do whatever you want with the data
      //console.log(data);
      //displaying error for 3 secs
      setError(data.err);
      setTimeout(() => {
        setError("");
        setAdminLogin((prev) => ({ ...prev, email: "", password: "" }));
      }, 3000);

      //if we get authToken in response then we store it in local storage and redirect user to private route
      if (data.authToken) {
        localStorage.setItem("authToken", data.authToken);
        history.push(`/admin/${data.adminId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1 className="mx-5">
        Admin can login here and can post task for students
      </h1>
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
              value={adminLogin.email}
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
              className="form-control"
              onChange={handleChange}
              name="password"
              value={adminLogin.password}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p>{error} </p>
    </div>
  );
}

export default AdminLogin;
