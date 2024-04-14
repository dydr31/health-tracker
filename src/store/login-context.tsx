import React, { useState } from "react";
import { getUserId } from "../util/login-functions";

type LogInContextObj = {
  LogIn: boolean;
  Email: string;
  id: string;
  fetchId: () => void;
  
};

export const LogInContext = React.createContext<LogInContextObj>({
  LogIn: false,
  Email: "",
  id: '',
  fetchId: () => {},
});

const LogInContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  let LogInStatus = false;
  let Email = "";
  if (localStorage.getItem("Log In") === "true") {
    LogInStatus = true;
    Email = localStorage.getItem("Email")!;
  } else {
    LogInStatus = false;
    Email = "";
  }

  const [id, setId] = useState('')

  const fetchIdHandler = async () => {
    let id = await getUserId(Email)
    console.log(id)
  }

  const contextValue: LogInContextObj = {
    LogIn: LogInStatus,
    Email: Email,
    id,
    fetchId: fetchIdHandler
  };
  return (
    <LogInContext.Provider value={contextValue}>
      {props.children}
    </LogInContext.Provider>
  );
};

export default LogInContextProvider;
