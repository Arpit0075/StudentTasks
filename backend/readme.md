This is the backend API for registering user, login and then resetting password for the user, displaying data stored in database about urlShortner

These are the end points-

get "https://urlshortner-react.herokuapp.com/" - gives welcome message

post "https://urlshortner-react.herokuapp.com/register" - allows us to register user (create temporary account)

post "https://urlshortner-react.herokuapp.com/activate" - allows us to activate the registered user

post "https://urlshortner-react.herokuapp.com/login" - allows us to login the user

post "https://urlshortner-react.herokuapp.com/forgotPass" - allows us to initiate start of password reset process, we send email through this end point

put "https://urlshortner-react.herokuapp.com/resetPass" - allows us to send email, new password and otp to our database and reset password

get "https://urlshortner-react.herokuapp.com/private" - user will be able to access this route only if he is logged in
