import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Token } from "../Context/AuthContext";
import { BASE_URL } from "../url";

function Private({ match }) {
  // eslint-disable-next-line
  const [auth, setAuth] = useContext(Token);

  let history = useHistory();

  //state for handling data coming from backend
  const [tasks, setTasks] = useState([]);

  //state to display the partiicular day wise selected task by logged in student
  const [selectedTask, setSelectedTask] = useState({});

  //state to manage solution link and send it to backend
  const [solution, setSolution] = useState("");

  //state to display message for confirmation after information is received from backend once we submit the solution
  const [message, setMessage] = useState("");

  //state for dispalying task solutions reveived from backend
  const [solutions, setSolutions] = useState([]);

  //get req to tasks
  useEffect(() => {
    const getData = async () => {
      try {
        let deployedUrl = BASE_URL + "tasks";

        const res = await fetch(deployedUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
        });
        const data = await res.json();
        setTasks(data);
        setSelectedTask(data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    return;
  }, []);

  //function to get particular day task when clicked
  const handleClick = (id) => {
    setSelectedTask({});
    let array = [...tasks];
    array = array.filter((el) => {
      return el._id === id;
    });

    setSelectedTask(...array);
  };

  //function to submit solution to backend post req to taskSubmissions collection
  const submitSolution = async () => {
    let deployedUrl = BASE_URL + "taskSubmissions";

    const res = await fetch(deployedUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ selectedTask, solution, day: selectedTask.day }),
    });
    const data = await res.json();

    setMessage(data.message);
    setSolution("");
    setTimeout(() => {
      setMessage("");
    }, 2000);

    //updating solutions(adding new solution) after submitting solution for a new task if we are getting new solution from backend
    if (data.newSolution) {
      let array = [...solutions];
      array.push(data.newSolution);
      //console.log(array);
      setSolutions(array);
    }

    //else updating the existing solution if we are getting updataed solution from backend
    else if (data.updatedSolution.value) {
      let array1 = [...solutions];
      let index = array1.findIndex(
        (el) => el._id === data.updatedSolution.value._id
      );
      array1[index].solution = data.updatedSolution.value.solution;
    }
  };

  //get req to get task submissions by particular student
  useEffect(() => {
    const getSolutions = async () => {
      try {
        let deployedUrl = BASE_URL + "taskSubmissions";
        const res = await fetch(deployedUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
        });
        const data = await res.json();

        let array = [...data];
        array = array.filter((el) => {
          return el.submittedById === match.params.id;
        });

        setSolutions(array);
      } catch (err) {
        console.log(err);
      }
    };
    getSolutions();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Day wise tasks</h1>
      <p>Please select a day to view the task </p>

      {/* logout button */}
      <button
        className="btn btn-info my-3 logoutBtn"
        onClick={() => {
          localStorage.removeItem("authToken");
          setAuth(false);
          history.push("/");
        }}
      >
        Logout
      </button>
      <div
        className="mx-5 my-5"
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {tasks.map((task) => {
          return (
            <div key={task._id}>
              <button
                type="button"
                className="btn btn-danger mx-2"
                onClick={() => handleClick(task._id)}
              >
                {task.day}
              </button>
            </div>
          );
        })}
      </div>

      {/* display the task selected day wise */}
      <div
        className="card "
        style={{
          maxWidth: "500px",
          marginTop: "4rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">Day: {selectedTask.day}</h5>
          <p className="card-text">Activity: {selectedTask.activity}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Date: {selectedTask.date}</li>
          <li className="list-group-item">
            Reference:{" "}
            <a href={selectedTask.reference} target="_blank" rel="noreferrer">
              {selectedTask.reference}
            </a>
          </li>
          <input
            className="mx-2 my-2"
            name="solution"
            value={solution}
            onChange={(e) => {
              setSolution(e.target.value);
            }}
            placeholder="Enter your solution link here"
          />
        </ul>
        <button className="btn btn-danger my-2" onClick={submitSolution}>
          Submit Solution
        </button>
      </div>
      <p> {message} </p>

      {/* displaying solutons that we received from backed */}
      <h3 className="my-5">Submitted solutions</h3>
      <div
        className="mx-2 my-2"
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {solutions.map((solution) => {
          return (
            <div
              className="card mx-2"
              style={{ width: "18rem" }}
              key={solution._id}
            >
              <div className="card-header">Day: {solution.day}</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Task: {solution.activity}</li>
                <li className="list-group-item">
                  Solution Link: {solution.solution}
                </li>
              </ul>
              <li className="list-group-item">Grade: {solution.grade}</li>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Private;
