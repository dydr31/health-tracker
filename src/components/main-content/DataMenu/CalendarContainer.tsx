import { Calendar } from "./Calendar";
import classes from "./CalendarContainer.module.scss";
import arrow from "../../pics/down-arrow.png";
import { useContext, useState } from "react";
import { DataContext } from "../../../store/data-context";

export const CalendarContainer: React.FC = () => {
  let today = new Date();

  let todayMonth = today.getMonth() + 1;
  let todayYear = today.getFullYear();

  const [month, setMonth] = useState(todayMonth);
  const [year, setYear] = useState(todayYear)


  const clickLeft = () => {
    if (month !== 1){
    setMonth(month - 1)}
    else {
        setMonth(12)
        setYear(year - 1)
    }
  }

  const clickRight = () => {
    if(month !== 12){
    setMonth(month + 1)}
    else {
        setMonth(1)
        setYear(year + 1)
    }
  }

  



  return (
    <>
    <div className={classes["calendar-container"]}>
      <img src={arrow} className={classes["left-arrow"]} onClick={clickLeft}/>
      <Calendar month={month} year={year} />
      <img src={arrow} className={classes["right-arrow"]} onClick={clickRight}/>
    </div>
    </>
  );
};
