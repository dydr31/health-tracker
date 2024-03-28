import { click } from "@testing-library/user-event/dist/click";
import { createContext, useState } from "react";
import React from "react";

type FormsStateContextObj = {
  number: number;
  form: boolean;
  dataMenu: boolean;
  dataPick: boolean;
  clicks: number;
  setNumber: () => void;
  toggleForm: () => void;
  toggleDataMenu: () => void;
  toggleDataPick: () => void;
  plusClick: () => void;
  minusClick: () => void;
};

export const FormsStateContext = React.createContext<FormsStateContextObj>({
  number: 7,
  form: false,
  dataMenu: false,
  dataPick: false,
  clicks: -1,
  setNumber: () => {},
  toggleForm: () => {},
  toggleDataMenu: () => {},
  toggleDataPick: () => {},
  plusClick: () => {},
  minusClick: () => {},
});

export const FormsStateContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [form, setForm] = useState(false);
  const [dataMenu, setDataMenu] = useState(false)
  const [dataPick, setDataPickMenu] = useState(false)

  const [number, setNumber] = useState(7)
  const [clicks, setClicks] = useState(-1)

  const toggleForm = () => {
    setForm(!form);
  };

  const toggleDataMenu =() => {
    setDataMenu(!dataMenu)
  }

  const toggleDataPick = () => {
    setDataPickMenu(!dataPick)
  }

  const setNumberHandler = () => {
    setNumber(number + 1)
    
  }

  const plusClick = () => {
    setClicks(clicks + 1)
  }

  const minusClick = () => {
    setClicks(clicks - 1)

  }
  

  const contextValue: FormsStateContextObj = {
    number,
    clicks,
    form,
    dataMenu,
    dataPick,
    setNumber: setNumberHandler,
    toggleForm,
    toggleDataMenu,
    toggleDataPick,
    plusClick,
    minusClick,

  };

  return (
    <>
      <FormsStateContext.Provider value={contextValue}>
        {props.children}
      </FormsStateContext.Provider>
    </>
  );
};
