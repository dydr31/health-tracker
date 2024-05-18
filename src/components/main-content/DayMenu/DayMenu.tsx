import { useContext } from "react";
import classes from "./DayMenu.module.scss";
import { DayDataContext } from "../../../store/day-data-context";
import { FormsStateContext } from "../../../store/forms-state-context";
import { Button } from "../../UI/buttons/Button";
import { AnimatePresence } from "framer-motion";

export const DayMenu: React.FC = () => {
  const { day, month, year, data } = useContext(DayDataContext);
  const { toggleDayMenu } = useContext(FormsStateContext);

  let monthName = (new Date(year, month - 1, day )).toLocaleDateString("en-us", {
    day: 'numeric',
    month: "long",
    year: "numeric",
  });

  return (
    <>

      <div
        className={classes["day-menu"]}
        // onClick={() => {
        //   toggleDayMenu();
        // }}
      >
        <h3>{monthName} </h3>
        <div className={classes.content}>
          <label>Systolic blood pressure</label>
          <div className={classes["data-container"]}>
            <p>{data[0].upper}</p>
          </div>
          <label>Diastolic blood pressure</label>
          <div className={classes["data-container"]}>
            <p>{data[0].lower}</p>
          </div>
          <label>Pulse</label>
          <div className={classes["data-container"]}>
            <p>{data[0].pulse}</p>
          </div>
        </div>
        <Button text='Update' onClick={() => {}}/>
      </div>
    
    </>
  );
};
