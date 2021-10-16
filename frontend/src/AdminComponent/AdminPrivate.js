import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

function AdminPrivate({ match }) {
  //state for setting inputs for the task to be sent to backend
  const [task, setTask] = useState({
    activity: "",
    reference: "",
    day: "",
  });

  //state for setting tasks data we get from backend
  const [tasks, setTasks] = useState([]);

  let history = useHistory();

  //function to control state for task
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  //sending task data to backend - task endpoint
  const postTask = async (e) => {
    e.preventDefault();

    const localUrl = "http://localhost:3001/tasks";

    const response = await fetch(localUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    console.log(data);
    setTask((prev) => ({ ...prev, activity: "", reference: "", day: "" }));

    //updating data after posting it to backend
    let array = [...tasks];
    array.push(data);
    setTasks(array);
  };

  //getting task data from backend
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
        });

        const data = await response.json();
        //console.log(data);
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    };
    getTasks();
  }, []);

  return (
    <div className="AdminPrivate mx-2 my-1">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <h1>Welcome Admin!!</h1>
        <Link
          to={`/admin/${match.params.id}/tasksubmissions`}
          style={{ textDecoration: "none" }}
        >
          View Task Submissions
        </Link>
      </div>

      {/* ui to post to */}
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Task
        </label>
        <div className="col-sm-10">
          <input
            name="activity"
            className="form-control"
            onChange={handleChange}
            value={task.activity}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Reference Link
        </label>
        <div className="col-sm-10">
          <input
            name="reference"
            className="form-control"
            onChange={handleChange}
            value={task.reference}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Day
        </label>
        <div className="col-sm-10">
          <input
            name="day"
            className="form-control"
            onChange={handleChange}
            value={task.day}
          />
        </div>
      </div>
      <button onClick={postTask}>Post Task</button>
      {/* displaying tasks from backend */}
      <h3 className="my-3">Tasks</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {tasks.map((task) => {
          return (
            <div
              className="card my-3 mx-3"
              style={{ width: "15rem" }}
              key={task._id}
            >
              <div className="card-body">
                <h5 className="card-title">Day: {task.day}</h5>
                <p className="card-text">Date: {task.date}</p>
                <p className="card-text">Task: {task.activity}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Reference: {task.reference}</li>
              </ul>
            </div>
          );
        })}
      </div>
      {/* logout button */}
      <button
        onClick={() => {
          localStorage.removeItem("authToken");
          history.push("/admin");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminPrivate;
