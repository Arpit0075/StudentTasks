This is the backend API for registering user, login and then resetting password for the user, displaying data stored in database about urlShortner

These are the end points-

get "https://student-task1.herokuapp.com/" - gives welcome message

post "https://student-task1.herokuapp.com/forgotPass"- allows student with existing account to enter email (create temporary account)

post "https://student-task1.herokuapp.com/resetPass" - allows student to reset password

post "https://student-task1.herokuapp.com/register"- allows student to create a new account

post "https://student-task1.herokuapp.com/login"- allows student to login

post "https://student-task1.herokuapp.com/adminLogin" - allows admin to login

get "https://student-task1.herokuapp.com/students" - allows admin to get students detail , admin must login to get the details

post "https://student-task1.herokuapp.com/taskSubmissions" - allows student to post solution for the task

get "https://student-task1.herokuapp.com/taskSubmissions" - allows admin to get details about task submissions

put "https://student-task1.herokuapp.com/taskSubmissions/:id" - allows admin to submit grade about a particular task by particular student
