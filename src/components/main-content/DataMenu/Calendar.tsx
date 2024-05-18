import { useContext } from "react";
import classes from "./Calendar.module.scss";
import { DataContext } from "../../../store/data-context";
import { DayDisplay } from "./DayDisplay";

export const Calendar: React.FC<{ month: number; year: number }> = ({
  month,
  year,
}) => {
  //month index starts with 1
  let firstDayOfTheMonth = new Date(year + "-" + month + +"-01");
  let dayOfTheWeekOfTheFirstDayOfTheMonth = firstDayOfTheMonth.getDay();
  let daysInAMonth = new Date(year, month, 0).getDate();

  let monthName = firstDayOfTheMonth.toLocaleDateString("en-us", {
    month: "long",
    year: "numeric",
  });

  let arrayOfEmptyElements = [];
  if (dayOfTheWeekOfTheFirstDayOfTheMonth === 0) {
    dayOfTheWeekOfTheFirstDayOfTheMonth = 7;
  }
  for (let i = 1; i < dayOfTheWeekOfTheFirstDayOfTheMonth; i++) {
    arrayOfEmptyElements.push({ id: "empty" + i });
  }

  let array = [];
  for (let i = 1; i <= daysInAMonth; i++) {
    array.push({
      //   date: new Date(year, month, i),
      day: i,
      year: year,
      month: month,
      data: [{ lower: 0, upper: 0, pulse: 0 }],
    });
  }

  const { items } = useContext(DataContext);

  let restructuredItems = items.map((x) => ({
    // date: new Date(Number(x.date.seconds) * 1000),
    day: new Date(Number(x.date.seconds) * 1000).getDate(),
    month: new Date(Number(x.date.seconds) * 1000).getMonth() + 1,
    year: new Date(Number(x.date.seconds) * 1000).getFullYear(),
    lower: x.lower,
    upper: x.upper,
    pulse: x.pulse,
  }));

  let filtered = restructuredItems.filter((x) => x.year === year);
  filtered = restructuredItems.filter((x) => x.month === month);

  //   let matchedDays = [];
  if (filtered.length !== 0) {
    for (let i = 0; i <= filtered.length; i++) {
      let found = array.filter((x) => x.day === filtered[i]?.day);
      found = found.filter((x) => x.month === filtered[i]?.month);
      found = found.filter((x) => x.year === filtered[i]?.year);
      let indexOfFound = array.indexOf(found[0]);
      if (indexOfFound !== -1) {
        // console.log(filtered[i])
        array[indexOfFound].data = [
          {
            lower: filtered[i].lower,
            upper: filtered[i].upper,
            pulse: filtered[i].pulse,
          },
        ];
      }
      //   if (found.length !== 0) {
      //     matchedDays.push(found[0]);
      //   }
    }
  }



  return (
    <>
      
      <div className={classes["month-container"]}>
        <h3>{monthName}</h3>

        <ul className={classes.table}>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
          <li>Sun</li>
          {arrayOfEmptyElements.map((x) => (
            <li key={x.id}></li>
          ))}
          {array.map((x) => (
            // <li key={x.day} id={String(x.day)} onClick={openDayMenu}>
            //     {x.day}
            // </li>
            <DayDisplay
              key={x.day}
              day={x.day}
              month={x.month}
              year={x.year}
              data={x.data}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
