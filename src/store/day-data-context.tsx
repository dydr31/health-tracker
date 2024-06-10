import React, { useContext, useState } from "react";

type dataObj = { upper: number; lower: number; pulse: number }[];

export type DataPointDataObj = {
  upper: number;
  lower: number;
  pulse: number;
  date: { seconds: number, };
};

type ContextObj = {
  day: number;
  month: number;
  year: number;
  data: dataObj;
  hours: number;
  morningData: DataPointDataObj;
  eveningData: DataPointDataObj;
  setMorningDataHandler: (data: DataPointDataObj) => void;
  setEveningDataHandler: (data: DataPointDataObj) => void;
  setAllData: (
    day: number,
    month: number,
    year: number

    // date: Date
  ) => void;
};

export const DayDataContext = React.createContext<ContextObj>({
  day: 0,
  month: 0,
  year: 0,
  hours: 0,
  morningData: { upper: 0, lower: 0, pulse: 0, date: { seconds: 0 } },
  eveningData: { upper: 0, lower: 0, pulse: 0, date: { seconds: 0 } },
  //   date: new Date(),
  data: [{ upper: 0, lower: 0, pulse: 0 }],
  //   setMorningData: () => {},
  setMorningDataHandler: () => {},
  setEveningDataHandler: () => {},
  setAllData: () => {},
});

export const DayDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [hours, setHours] = useState(0);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([{ upper: 0, lower: 0, pulse: 0 }]);
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

  const setDayMontYear = (day: number, month: number, year: number) => {
    setDay(day);
    setMonth(month);
    setYear(year);
  };

  const setMorningDataHandler = (data: DataPointDataObj) => {
    setMorningData(data);
  };

  const setEveningDataHandler = (data: DataPointDataObj) => {
    setEveningData(data)
  }

  const contextValue = {
    day,
    month,
    year,
    data,
    hours,
    morningData,
    eveningData,
    setMorningDataHandler,
    setEveningDataHandler,
    // date,
    setAllData: setDayMontYear,
  };
  return (
    <DayDataContext.Provider value={contextValue}>
      {children}
    </DayDataContext.Provider>
  );
};
