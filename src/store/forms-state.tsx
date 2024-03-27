import { createContext, useState } from "react";
import React from "react";

type FormsStateContextObj = {
  form: boolean;
  dataMenu: boolean;
  dataPick: boolean;
  toggleForm: () => void;
  toggleDataMenu: () => void;
};

export const FormsStateContext = React.createContext<FormsStateContextObj>({
  form: false,
  dataMenu: false,
  dataPick: false,
  toggleForm: () => {},
  toggleDataMenu: () => {},
});

export const FormsStateContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [form, setForm] = useState(false);
  const [dataMenu, setDataMenu] = useState(false)

  const toggleForm = () => {
    setForm(!form);
  };

  const toggleDataMenu =() => {
    setDataMenu(!dataMenu)
  }

  const contextValue: FormsStateContextObj = {
    form: form,
    dataMenu: dataMenu,
    dataPick: false,
    toggleForm,
    toggleDataMenu,

  };

  return (
    <>
      <FormsStateContext.Provider value={contextValue}>
        {props.children}
      </FormsStateContext.Provider>
    </>
  );
};
