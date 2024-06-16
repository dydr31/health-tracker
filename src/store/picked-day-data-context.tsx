import React, { useState } from "react";

export type DataPointDataObj = {
  upper: number;
  lower: number;
  pulse: number;
  date: { seconds: number };
};

type ContextObj = {
  day: number;
  month: number;
  year: number;
  morningData: DataPointDataObj;
  eveningData: DataPointDataObj;
  setMorningDataHandler: (data: DataPointDataObj) => void;
  setEveningDataHandler: (data: DataPointDataObj) => void;
  setDate: (day: number, month: number, year: number) => void;
};

export const PickedDayDataContext = React.createContext<ContextObj>({
  day: 0,
  month: 0,
  year: 0,
  morningData: { upper: 0, lower: 0, pulse: 0, date: { seconds: 0 } },
  eveningData: { upper: 0, lower: 0, pulse: 0, date: { seconds: 0 } },
  setMorningDataHandler: () => {},
  setEveningDataHandler: () => {},
  setDate: () => {},
});

export const PickedDayDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const [morningData, setMorningData] = useState({
    upper: 0,
    lower: 0,
    pulse: 0,
    date: { seconds: 0 },
  });
  
  const [eveningData, setEveningData] = useState({
    upper: 0,
    lower: 0,
    pulse: 0,
    date: { seconds: 0 },
  });

  const setDate = (day: number, month: number, year: number) => {
    setDay(day);
    setMonth(month);
    setYear(year);
  };

  const setMorningDataHandler = (data: DataPointDataObj) => {
    setMorningData(data);
  };

  const setEveningDataHandler = (data: DataPointDataObj) => {
    setEveningData(data);
  };

  const contextValue = {
    day,
    month,
    year,
    morningData,
    eveningData,
    setMorningDataHandler,
    setEveningDataHandler,
    setDate: setDate,
  };
  return (
    <PickedDayDataContext.Provider value={contextValue}>
      {children}
    </PickedDayDataContext.Provider>
  );
};
