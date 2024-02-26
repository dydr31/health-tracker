import React from "react";

type LogInContextObj = {
  LogIn: boolean;
  Email: string;
};

export const LogInContext = React.createContext<LogInContextObj>({
  LogIn: false,
  Email: "",
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
  };
  return (
    <LogInContext.Provider value={contextValue}>
      {props.children}
    </LogInContext.Provider>
  );
};

export default LogInContextProvider;
