import React, { useContext, useEffect, useRef, useState } from "react";
import { addDataPoint } from "../../../util/data-functions";
import { Button } from "../../UI/buttons/Button";
import classes from "./Form.module.scss";
import { LogInContext } from "../../../store/login-context";
import {
  checkUpper,
  checkLower,
  checkPulse,
} from "../../../util/datapoint-form-validation";
import { DataContext } from "../../../store/data-context";
import { DayDataContext } from "../../../store/day-data-context";

export const Form: React.FC = () => {
  const upperRef = useRef<HTMLInputElement>(null);
  const lowerRef = useRef<HTMLInputElement>(null);
  const pulseRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const { Email } = useContext(LogInContext);

  const sumbitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    let dataPoint = checkForm();

    if (dataPoint !== null) {
      await addDataPoint(Email, [dataPoint!]);
      upperRef.current!.value = "";
      lowerRef.current!.value = "";
      pulseRef.current!.value = "";
      dateRef.current!.value = '';
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }

  };
  let [invalidUpper, setInvalidUpper] = useState(false);
  let [invalidLower, setInvalidLower] = useState(false);
  let [invalidPulse, setInvalidPulse] = useState(false);
  let [invalidDate, setInvalidDate] = useState(false);

  const checkForm = () => {
    let upper = Number(upperRef.current!.value);
    let lower = Number(lowerRef.current!.value);
    let pulse = Number(pulseRef.current!.value);
    let date = new Date (dateRef.current!.value);
    
    if(dateRef.current!.value === ''){
      date = new Date()
    }

    if (checkUpper(upper) && checkLower(lower) && checkPulse(pulse)) {
      let dataPoint = {
        date: date,
        upper: upper!,
        lower: lower!,
        pulse: pulse!,
        modified: false,
      };
      return dataPoint;
    }
    if (!checkUpper(upper)) {
      setInvalidUpper(true);
      return null;
    }
    if (!checkLower(lower)) {
      setInvalidLower(true);
      return null;
    }
    if (!checkPulse(pulse)) {
      setInvalidPulse(true);
      return null;
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

  return (
    <>
      <form className={classes.form} onSubmit={sumbitForm}>
        <div className={classes["inputs"]}>
          <label htmlFor="date">Date</label>
          <input
            type="datetime-local"
            className={`${classes["date-input"]} ${
              invalidDate ? classes["red"] : undefined
            }`}
            ref={dateRef}
            id="date"
            // onBlur={dateBlur}
            defaultValue='2020-01-01'
          />

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

        <Button text="save" onClick={sumbitForm} />
      </form>
    </>
  );
};
