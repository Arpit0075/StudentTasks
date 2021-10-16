import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TaskSubmissions({ match }) {
  //state for storing task solutions reveived from backend
  const [solutions, setSolutions] = useState([]);

  //state for displaying students
  const [students, setStudents] = useState([]);

  //state for selected student's solution
  const [selectedStudent, setSelectedStudent] = useState([]);

  //state to display message after updating grade
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //get req to get students data
  useEffect(() => {
    const getStudents = async () => {
      try {
        const localUrl = "http://localhost:3001/students";
        //const deployedUrl = "https://urlshortner-react.herokuapp.com/private";

        const res = await fetch(localUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
        });
        const data = await res.json();
        //console.log(data);
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
    // eslint-disable-next-line
  }, []);

  //get req to get task solutions
  useEffect(() => {
    const getSolutions = async () => {
      try {
        const localUrl = "http://localhost:3001/taskSubmissions";
        //const deployedUrl = "https://urlshortner-react.herokuapp.com/private";

        const res = await fetch(localUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
        });
        const data = await res.json();
        //console.log(data);
        setSolutions(data);
      } catch (err) {
        console.log(err);
      }
    };
    getSolutions();
    // eslint-disable-next-line
  }, []);

  //function to set state of solution so that the selected student's task submission will be displayed
  const handleClick = (id) => {
    setSelectedStudent([]);
    let array = [...solutions];
    array = array.filter((el) => {
      return el.submittedById === id;
    });
    //console.log(array);
    setSelectedStudent(array);
  };

  //function to submit grade, put req on task submission
  const submitGrade = async (id) => {
    //getting particular solution (by selected id) by student from solutions by student
    let result = selectedStudent.filter((el) => {
      return el._id === id;
    });
    //console.log(result[0].grade);

    try {
      const localUrl = `http://localhost:3001/taskSubmissions/${id}`;
      //const deployedUrl = "https://urlshortner-react.herokuapp.com/private";

      const res = await fetch(localUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ grade: result[0].grade }),
      });
      const data = await res.json();

      //console.log(data);
      setMessage(data.message);
      setError(data.err);

      setTimeout(() => {
        setMessage("");
      }, 2000);

      setTimeout(() => {
        setError("");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  //handle change function to set grade of selected solution by a student from array of solutions by astudent
  const handleChange = (e, id) => {
    setSelectedStudent(
      selectedStudent.map((el) =>
        el._id === id ? { ...el, grade: e.target.value } : { ...el }
      )
    );
  };

  return (
    <div>
      <Link to={`/admin/${match.params.id}`}> Admin Home </Link>
      <h1>Task Submissions by students</h1>
      <p>Please select student to view task submission </p>

      {/* displaying students */}
      <div
        className="mx-5 my-5"
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {students.map((student) => {
          return (
            <div key={student._id}>
              <button
                type="button"
                className="btn btn-danger mx-2"
                onClick={() => handleClick(student._id)}
              >
                {student.name}, {student.email}
              </button>
            </div>
          );
        })}
      </div>

      {/* displaying solution by selected student */}
      <div
        className="card "
        style={{
          marginTop: "4rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {selectedStudent.map((el) => {
          return (
            <div style={{ marginLeft: "1rem" }} key={el._id}>
              <div className="card-body my-2">
                <h5 className="card-title">Task: {el.activity}</h5>
                <p className="card-text">Date: {el.day}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Submitted Date: {el.submittedTime}
                </li>
                <li className="list-group-item">
                  Solution Link: {el.solution}
                </li>
                <li className="list-group-item">Grade: {el.grade}</li>
                <input
                  className="mx-2 my-2"
                  name="grade"
                  type="number"
                  value={selectedStudent.grade}
                  onChange={(e) => {
                    handleChange(e, el._id);
                  }}
                  placeholder="Grade"
                />
              </ul>
              <button
                className="btn btn-danger my-2"
                onClick={() => submitGrade(el._id)}
              >
                Submit Grade
              </button>
            </div>
          );
        })}
      </div>

      {/* displaying message after submitting grade */}
      <p> {message} </p>
      <p> {error} </p>
    </div>
  );
}

export default TaskSubmissions;
