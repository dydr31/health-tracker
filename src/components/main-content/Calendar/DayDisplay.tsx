import { useContext } from "react";
import classes from "./DayDisplay.module.scss";
import { FormsStateContext } from "../../../store/forms-context";
import { PickedDayDataContext } from "../../../store/picked-day-data-context";

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
  const { setCalendarHandler, setFixedDateMenu } =
    useContext(FormsStateContext);
  const {
    setDate: setAllData,
    setMorningDataHandler,
    setEveningDataHandler,
  } = useContext(PickedDayDataContext);

  let today = new Date();
  let date = new Date (year, month - 1, day)
  let isFuture = false
  if(today < date){
    isFuture = true
  }

  const openDayDataMenu = () => {
    if (!isFuture){

    
    setCalendarHandler();
    setFixedDateMenu(true);
    if (hasMorningData) {
      setMorningDataHandler(morningData);
    }
    if (hasEveningData) {
      setEveningDataHandler(eveningData);
    }
    setAllData(day, month, year);
  }
  };

  return (
    <>
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
        ${isFuture && classes.disabled
          
        }

        `}
      >
        {day}
      </li>
    </>
  );
};
