import { createContext, useState, useEffect } from "react";

export const Token = createContext();

export const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return <Token.Provider value={[auth, setAuth]}> {children} </Token.Provider>;
};
