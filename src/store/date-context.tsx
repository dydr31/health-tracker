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
  let [date1, setDate1] = useState("2020-01-01");
  let [date2, setDate2] = useState("2020-01-01");

  const addDateFromHandler = (date1: string) => {
    setDate1(date1);
  };

  const addDateToHandler = (date2: string) => {
    setDate2(date2);
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
