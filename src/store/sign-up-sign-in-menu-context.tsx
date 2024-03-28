import React, { useState } from "react";

type signInContextObj = {
  defaultMenu: boolean;
  mainMenu: boolean;
  signIn: boolean;
  signUp: boolean;
  toggleMainMenu: () => void;
  toggleSignIn: () => void;
  toggleSignUp: () => void;
};

export const SignInContext = React.createContext<signInContextObj>({
  defaultMenu: true,
  mainMenu: false,
  signIn: false,
  signUp: false,
  toggleMainMenu: () => {},
  toggleSignIn: () => {},
  toggleSignUp: () => {},
});

export const SignInContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
    const [defaultMenu, setDefaultMenu] = useState(true)
  const [mainMenu, setMainMenu] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);


  const toggleMainMenu = () => {
    setMainMenu(!mainMenu);
    
  };
  const toggleSignIn = () => {
    setSignIn(!signIn);
  };
  const toggleSignUp = () => {
    setSignUp(!signUp);
  };

  const contextValue = {
    defaultMenu,
    mainMenu,
    signIn,
    signUp,
    toggleMainMenu,
    toggleSignIn,
    toggleSignUp,
  };
  return (
    <SignInContext.Provider value={contextValue}>
      {props.children}
    </SignInContext.Provider>
  );
};
