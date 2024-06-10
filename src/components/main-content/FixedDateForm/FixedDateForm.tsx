import classes from "./FixedDateForm.module.scss";

import { Button } from "../../UI/buttons/Button";
import { useContext, useState, useRef, useEffect } from "react";
import { DayDataContext } from "../../../store/day-data-context";
import { LogInContext } from "../../../store/login-context";

import {
  checkUpper,
  checkLower,
  checkPulse,
} from "../../../util/datapoint-form-validation";
import { addDataPoint, updateData } from "../../../util/data-functions";
import { DataPointDataObj } from "../../../store/day-data-context";
import { DataContext } from "../../../store/data-context";

export const FixedDateForm: React.FC<{
  data: DataPointDataObj;
  isMorning: boolean;
}> = ({ data, isMorning }) => {
  const { day, month, year } = useContext(DayDataContext);
  const date = new Date(Number(data.date.seconds * 1000));
  const fixedDate = new Date(year, month - 1, day);

  let dateString = fixedDate.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let hoursString = date
    .toLocaleDateString("en-us", {
      hour: "2-digit",
    })
    .slice(11, 13);
  if (hoursString[0] === "0") {
    hoursString = hoursString.slice(1);
  }

  const timeRef = useRef<HTMLInputElement>(null);
  const upperRef = useRef<HTMLInputElement>(null);
  const lowerRef = useRef<HTMLInputElement>(null);
  const pulseRef = useRef<HTMLInputElement>(null);

  let [invalidTime, setInvalidTime] = useState(false);
  let [invalidUpper, setInvalidUpper] = useState(false);
  let [invalidLower, setInvalidLower] = useState(false);
  let [invalidPulse, setInvalidPulse] = useState(false);

  const [isNewEntry, setIsNewEntry] = useState(true);

  useEffect(() => {
    if (data.upper !== 0) {
      upperRef.current!.value = data.upper.toString();
      lowerRef.current!.value = data.lower.toString();
      pulseRef.current!.value = data.pulse.toString();
      timeRef.current!.value = hoursString;
      setIsNewEntry(false);
    } else {
      upperRef.current!.value = "";
      lowerRef.current!.value = "";
      pulseRef.current!.value = "";
      timeRef.current!.value = "";
      setIsNewEntry(true);
    }
  }, [data]);

  const handleTimeBlur = () => {
    const time = Number(timeRef.current!.value);
    if (time <= 12) {
      setInvalidTime(false);
    } else {
      setInvalidTime(true);
    }
  };

  const handleUpperBlur = () => {
    const upper = Number(upperRef.current!.value);
    if (checkUpper(upper) === true) {
      setInvalidUpper(false);
    } else {
      setInvalidUpper(true);
    }
  };

  const handleLowerBlur = () => {
    const lower = Number(lowerRef.current!.value);
    if (checkLower(lower) === true) {
      setInvalidLower(false);
    } else {
      setInvalidLower(true);
    }
  };

  const handlePulseBlur = () => {
    const pulse = Number(lowerRef.current!.value);
    if (checkPulse(pulse) === true) {
      setInvalidPulse(false);
    } else {
      setInvalidPulse(true);
    }
  };

  const checkTime = (time: string) => {
    if (time !== "" && Number(time) <= 12) {
      return true;
    } else return false;
  };

  const newDate = (time: number) => {
    if (!isMorning) {
      time = time + 12;
    }
    let date = new Date(year, month - 1, day, time);
    return date;
  };

  const checkForm = () => {
    let upper = Number(upperRef.current!.value);
    let lower = Number(lowerRef.current!.value);
    let pulse = Number(pulseRef.current!.value);
    let time = timeRef.current!.value;

    if (
      checkUpper(upper) &&
      checkLower(lower) &&
      checkPulse(pulse) &&
      checkTime(time)
    ) {
      let date = newDate(Number(time));
      let dataPoint = {
        date: date,
        upper: upper!,
        lower: lower!,
        pulse: pulse!,
      };
      console.log(dataPoint);
      return dataPoint;
    }
    if (!checkTime(time)) {
      setInvalidTime(true);
    }
    if (!checkUpper(upper)) {
      setInvalidUpper(true);
    }
    if (!checkLower(lower)) {
      setInvalidLower(true);
    }
    if (!checkPulse(pulse)) {
      setInvalidPulse(true);
    }
    return null;
  };

  const checkIfChanged = () => {
    let upper = Number(upperRef.current!.value);
    let lower = Number(lowerRef.current!.value);
    let pulse = Number(pulseRef.current!.value);
    let time = Number(timeRef.current!.value);

    if (
      upper !== data.upper ||
      lower !== data.lower ||
      pulse !== data.pulse ||
      time !== Number(hoursString)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const { Email } = useContext(LogInContext);
  const { removeItem } = useContext(DataContext);

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    if (checkIfChanged()) {
      console.log("data changed");
      let dataPoint = checkForm();
      if (dataPoint !== null) {
        console.log("removing prev datapoint and adding new");

        let transformedData = [
          {
            lower: data.lower,
            upper: data.upper,
            pulse: data.pulse,
            date: { seconds: data.date.seconds, nanoseconds: 0 },
          },
        ];
        console.log(transformedData);

        let date = { seconds: data.date.seconds, nanoseconds: 0 };

        if (!isNewEntry) {
          await removeItem(date, Email);
        }

        //await updateData(Email, [dataPoint!])
        await addDataPoint(Email, [dataPoint!]);
      }
    } else {
      console.log("data hasnt changed");
    }
    //window.location.reload()
  };
  const deleteEntry = async () => {
    if (!isNewEntry) {
      let date = { seconds: data.date.seconds, nanoseconds: 0 };
      await removeItem(date, Email);
    }
  };

  const formHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      
      <form className={classes.form} onSubmit={formHandler}>
        <div className={classes["inputs"]}>
          <label htmlFor="date">Date</label>
          <p id="date">{dateString}</p>
          <label htmlFor="time">Time</label>
          <div className={classes["time-form"]}>
            <input
              type="text"
              className={`${classes["time-input"]} ${
                invalidTime && classes["red"]
              }`}
              ref={timeRef}
              onBlur={handleTimeBlur}
            />
            <p>{isMorning ? "AM" : "PM"}</p>
          </div>
          {/* <TimeForm isMorning={isMorning} hours={hoursString}/> */}
          <label htmlFor="upper">Systolic blood pressure</label>
          <input
            type="text"
            ref={upperRef}
            id="upper"
            className={`${classes["input"]} ${invalidUpper && classes["red"]}`}
            onBlur={handleUpperBlur}
          />

          <label htmlFor="lower">Diastolic blood pressure</label>
          <input
            type="text"
            ref={lowerRef}
            id="lower"
            className={`${classes["input"]} ${invalidLower && classes["red"]}`}
            onBlur={handleLowerBlur}
          />

          <label htmlFor="pulse">Pulse</label>
          <input
            type="text"
            ref={pulseRef}
            id="pulse"
            className={`${classes["input"]} ${invalidPulse && classes["red"]}`}
            onBlur={handlePulseBlur}
          />
        </div>

        <div className={classes["button-container"]}>
          <button
            onClick={deleteEntry}
            className={`${classes.button} ${
              isNewEntry ? classes.disabled : undefined
            }`}
          >
            delete
          </button>
          <button onClick={submitForm} className={classes.button}>
            save
          </button>
        </div>
      </form>
    </>
  );
};
