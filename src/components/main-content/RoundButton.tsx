import classes from "./RoundButton.module.scss";
import { useContext } from "react";
import { DataContext } from "../../store/data-context";
import { PickedDayDataContext } from "../../store/picked-day-data-context";
import { FormsStateContext } from "../../store/forms-context";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export const RoundButton: React.FC = () => {
  const { items } = useContext(DataContext);

  let {
    setMorningDataHandler,
    setEveningDataHandler,
    setDate: setAllData,
  } = useContext(PickedDayDataContext);

  const { setFixedDateMenu, fixedDateMenu } = useContext(FormsStateContext);

  const clickTodayFormHandler = () => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let filtered = items.map((x) => ({
      dateFormat: new Date(x.date.seconds * 1000),
      ...x,
    }));
    setAllData(day, month + 1, year);

    filtered = filtered.filter(
      (x) =>
        x.dateFormat.getFullYear() === year &&
        x.dateFormat.getMonth() === month &&
        x.dateFormat.getDate() === day
    );

    let filteredMorningData = filtered.filter(
      (x) => x.dateFormat.getHours() <= 12
    );

    if (filteredMorningData.length > 0) {
      let dataPoint = filteredMorningData.map((x) => ({
        upper: x.upper,
        lower: x.lower,
        pulse: x.pulse,
        date: { seconds: x.date.seconds },
      }));
      setMorningDataHandler(dataPoint[0]);
    }

    let eveningData = filtered.filter((x) => x.dateFormat.getHours() > 12);

    if (eveningData.length > 0) {
      let dataPoint = eveningData.map((x) => ({
        upper: x.upper,
        lower: x.lower,
        pulse: x.pulse,
        date: { seconds: x.date.seconds },
      }));
      setEveningDataHandler(dataPoint[0]);
    }
    setFixedDateMenu(true);
  };

  return (
    <div className={classes["round-button-container"]}>
      <AnimatePresence>
        {!fixedDateMenu && (
          <motion.button
            initial={{ y: -20, opacity: 0 }}
            animate={{  y: 0, opacity: 1}}
            exit={{ opacity:0}}
            transition={{ bounce: 0, duration: 0.2 }}
            
            onClick={clickTodayFormHandler}
            className={classes["round-button"]}
          >
            +
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
