import { useState } from "react";
import React from "react";

type FormsStateContextObj = {
  dataMenu: boolean;
  calendar: boolean;
  isMorning: boolean;
  fixedDateMenu: boolean;
  toggleDataMenu: () => void;
  setCalendarHandler: () => void;
  setIsMorning: (type: boolean) => void;
  setFixedDateMenu: (type: boolean) => void
};

export const FormsStateContext = React.createContext<FormsStateContextObj>({
  dataMenu: false,
  calendar: false,
  isMorning: false,
  fixedDateMenu: false,
  toggleDataMenu: () => {},
  setCalendarHandler: () => {},
  setIsMorning: () => {},
  setFixedDateMenu: () => {},

});

export const FormsStateContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {

  const [dataMenu, setDataMenu] = useState(false);
  const [calendar, setCalendar] = useState(false);

  const [number, setNumber] = useState(7);
  const [clicks, setClicks] = useState(-1);

  const toggleDataMenu = () => {
    setDataMenu(!dataMenu);
  };

  const setCalendarHandler = () => {
    setCalendar(!calendar);
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

  const [isMorning, setIsMorning] = useState(true)
  const [fixedDateMenu, setFixedDateMenu] = useState(false)

  const contextValue: FormsStateContextObj = {
    dataMenu,
    calendar,
    toggleDataMenu,
    setCalendarHandler,
    isMorning,
    setIsMorning,
    fixedDateMenu,
    setFixedDateMenu,
  };

  return (
    <>
      <FormsStateContext.Provider value={contextValue}>
        {props.children}
      </FormsStateContext.Provider>
    </>
  );
};
