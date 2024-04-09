import { useState } from "react";
import React from "react";

type FormsStateContextObj = {
  number: number;
  form: boolean;
  dataMenu: boolean;
  dataPick: boolean;
  clicks: number;
  isChart: boolean;
  setNumber: () => void;
  toggleForm: () => void;
  toggleDataMenu: () => void;
  toggleDataPick: () => void;
  plusClick: () => void;
  minusClick: () => void;
  toggleChart: (type: boolean) => void;
};

export const FormsStateContext = React.createContext<FormsStateContextObj>({
  number: 7,
  form: false,
  dataMenu: false,
  dataPick: false,
  clicks: -1,
  isChart: true,
  setNumber: () => {},
  toggleForm: () => {},
  toggleDataMenu: () => {},
  toggleDataPick: () => {},
  plusClick: () => {},
  minusClick: () => {},
  toggleChart: () => {},
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
    if (number <= 11) {
      setNumber(number + 1);
    }
  };

  const plusClick = () => {
    setClicks(clicks + 1);
  };

  const minusClick = () => {
    setClicks(clicks - 1);
  };

  const [isChart, setIsChart] = useState(true);

  const toggleChart = (type: boolean) => {
    setIsChart(type);
  };

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
    isChart,
    toggleChart,
  };

  return (
    <>
      <FormsStateContext.Provider value={contextValue}>
        {props.children}
      </FormsStateContext.Provider>
    </>
  );
};
