import { useState } from "react";
import React from "react";

type FormsStateContextObj = {
  number: number;
  form: boolean;
  dataMenu: boolean;
  dataPick: boolean;
  clicks: number;
  type: boolean;
  setNumber: () => void;
  toggleForm: () => void;
  toggleDataMenu: () => void;
  toggleDataPick: () => void;
  plusClick: () => void;
  minusClick: () => void;
  toggleType: () => void;
};

export const FormsStateContext = React.createContext<FormsStateContextObj>({
  number: 7,
  form: false,
  dataMenu: false,
  dataPick: false,
  clicks: -1,
  type: true,
  setNumber: () => {},
  toggleForm: () => {},
  toggleDataMenu: () => {},
  toggleDataPick: () => {},
  plusClick: () => {},
  minusClick: () => {},
  toggleType: () => {},
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

  const [type, setType] = useState(true)

  const toggleType = () => {
    setType(!type)
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
    type,
    toggleType,

  };

  return (
    <>
      <FormsStateContext.Provider value={contextValue}>
        {props.children}
      </FormsStateContext.Provider>
    </>
  );
};
