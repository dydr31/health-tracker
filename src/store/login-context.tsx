import React from "react";

type LogInContextObj = {
  LogIn: boolean;
  Email: string;
  id: string,
};

export const LogInContext = React.createContext<LogInContextObj>({
  LogIn: false,
  Email: "",
  id: '',
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

  

  const contextValue: LogInContextObj = {
    LogIn: LogInStatus,
    Email: Email,
    id: ''
  };
  return (
    <LogInContext.Provider value={contextValue}>
      {props.children}
    </LogInContext.Provider>
  );
};

export default LogInContextProvider;
