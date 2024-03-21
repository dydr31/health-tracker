import React, { useState } from "react";

type DatesContextObj = {
  dateFrom: string;
  dateTo: string;
  addDateFrom: (date1: string) => void;
  addDateTo: (date2: string) => void;
};

export const DatesContext = React.createContext<DatesContextObj>({
  dateFrom: "",
  dateTo: "",
  addDateFrom: () => {},
  addDateTo: () => {},
});

export const DatesContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  let [date1, setDate1] = useState("");
  let [date2, setDate2] = useState("");

  const addDateFromHandler = (date1: string) => {
    let date = new Date(date1).getTime().toString();
    setDate1(date);
  };

  const addDateToHandler = (date2: string) => {
    let date = new Date(date2).getTime().toString();
    setDate2(date);
  };

  const contextValue = {
    dateFrom: date1,
    dateTo: date2,
    addDateFrom: addDateFromHandler,
    addDateTo: addDateToHandler,
  };
  return (
    <DatesContext.Provider value={contextValue}>
      {props.children}
    </DatesContext.Provider>
  );
};
