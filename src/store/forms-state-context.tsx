import { useState } from "react";
import React from "react";

type FormsStateContextObj = {
  number: number;
  form: boolean;
  dataMenu: boolean;
  dataPick: boolean;
  clicks: number;
  isMorning: boolean;
  dayMenu: boolean;


  setNumber: () => void;
  toggleForm: () => void;
  toggleDataMenu: () => void;
  toggleDataPick: () => void;
  plusClick: () => void;
  minusClick: () => void;
  setIsMorning: (type: boolean) => void;
  toggleDayMenu: () => void;

};

export const FormsStateContext = React.createContext<FormsStateContextObj>({
  number: 7,
  form: false,
  dataMenu: false,
  dataPick: false,
  clicks: -1,
  isMorning: false,
  dayMenu: false,

  setNumber: () => {},
  toggleForm: () => {},
  toggleDataMenu: () => {},
  toggleDataPick: () => {},
  plusClick: () => {},
  minusClick: () => {},
  setIsMorning: () => {},
  toggleDayMenu: () => {},
 
  
});

export const FormsStateContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [form, setForm] = useState(false);
  const [dataMenu, setDataMenu] = useState(false);
  const [dataPick, setDataPickMenu] = useState(false);

  const [number, setNumber] = useState(7);
  const [clicks, setClicks] = useState(-1);

  const toggleForm = () => {
    setForm(!form);
  };

  const toggleDataMenu = () => {
    setDataMenu(!dataMenu);
  };

  const toggleDataPick = () => {
    setDataPickMenu(!dataPick);
  };

  const setNumberHandler = () => {
    if (number <= 14) {
      setNumber(number + 1);
    }
  };

  const plusClick = () => {
    setClicks(clicks + 1);
  };

  const minusClick = () => {
    setClicks(clicks - 1);
  };

  const [isMorning, setIsMorning] = useState(false)

  const [dayMenu, setDayMenu] = useState(false)

  const toggleDayMenu = () => {
    setDayMenu(!dayMenu)
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
    isMorning,
    setIsMorning,
    dayMenu,
    toggleDayMenu,


   
  };

  return (
    <>
      <FormsStateContext.Provider value={contextValue}>
        {props.children}
      </FormsStateContext.Provider>
    </>
  );
};
