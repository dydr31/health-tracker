import { useContext } from "react";
import classes from "./DayDisplay.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";
import { DayDataContext } from "../../../store/day-data-context";

export const DayDisplay: React.FC<{
  day: number;
  month: number;
  year: number;
  hasMorningData: boolean;
  hasEveningData: boolean;

  morningData: {
    lower: number;
    upper: number;
    pulse: number;
    date: { seconds: number };
  };
  eveningData: {
    lower: number;
    upper: number;
    pulse: number;
    date: { seconds: number };
  };
}> = ({
  day,
  month,
  year,
  hasMorningData,
  hasEveningData,
  morningData,
  eveningData,
}) => {

  const { toggleDataPick, setFixedDateMenu } = useContext(FormsStateContext);
  const { setAllData, setMorningDataHandler, setEveningDataHandler} = useContext(DayDataContext);

  //const hours = date.getHours()

  const openDayDataMenu = () => {
    toggleDataPick();
    setFixedDateMenu(true);
    if (hasMorningData){
      setMorningDataHandler(morningData)
      
    }
    if(hasEveningData){
      setEveningDataHandler(eveningData)
    }
    setAllData(day, month, year)
  };

  return (
    <>
      {/* {console.log(morningData)}
      {console.log(eveningData)} */}
      <li
        onClick={openDayDataMenu}
        className={`${classes.element} 
     
        ${
          hasMorningData && hasEveningData
            ? classes.highlighted
            : hasMorningData || hasEveningData
            ? classes["half-highlighted"]
            : undefined
        }

        `}
      >
        {day}
      </li>
    </>
  );
};
