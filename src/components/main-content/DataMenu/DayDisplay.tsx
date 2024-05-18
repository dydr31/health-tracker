import { useContext } from "react";
import classes from "./DayDisplay.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";
import { DayDataContext } from "../../../store/day-data-context";

export const DayDisplay: React.FC<{
  day: number;
  month: number;
  year: number;
  data: { lower: number; upper: number; pulse: number }[];
}> = ({ day, month, year, data }) => {
  let gotData = false;
  if (data[0].lower !== 0) {
    gotData = true;
  }
  const { toggleDayMenu, toggleDataPick, toggleForm } =
    useContext(FormsStateContext);
  const { setAllData: setData } = useContext(DayDataContext);

  const openDayDataMenu = () => {
    toggleDataPick();
    toggleForm();
    if (gotData) {
      console.log(data)
      setData(day, month, year, data);
    } else {
      setData(day, month, year, [{ lower: 0, upper: 0, pulse: 0 }]);
    }
  };
  return (
    <>
      <li
        onClick={openDayDataMenu}
        className={`${classes.element} ${
          gotData ? classes.highlighted : undefined
        }`}
      >
        {day}
      </li>
    </>
  );
};
