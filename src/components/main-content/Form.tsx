import React, { useContext, useRef, useState } from "react";
import { addDataPoint } from "../../store/data-functions";
import { Button } from "../UI/Button";
import classes from "./Form.module.scss";
import { LogInContext } from "../../store/login-context";
import {
  checkUpper,
  checkLower,
  checkPulse,
} from "../util/datapoint-form-validation";

export const Form: React.FC = () => {
  const upperRef = useRef<HTMLInputElement>(null);
  const lowerRef = useRef<HTMLInputElement>(null);
  const pulseRef = useRef<HTMLInputElement>(null);

  const logInCtx = useContext(LogInContext);

  const sumbitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    let checkData = checkForm();
    if (checkData !== null) {
      let email = logInCtx.Email;
      await addDataPoint(email, [checkData!]);
      upperRef.current!.value = "";
      lowerRef.current!.value = "";
      pulseRef.current!.value = "";
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  };
  let [invalidUpper, setInvalidUpper] = useState(false);
  let [invalidLower, setInvalidLower] = useState(false);
  let [invalidPulse, setInvalidPulse] = useState(false);

  const checkForm = () => {
    let upper = Number(upperRef.current!.value);
    let lower = Number(lowerRef.current!.value);
    let pulse = Number(pulseRef.current!.value);

    if (checkUpper(upper) && checkLower(lower) && checkPulse(pulse)) {
      let dataPoint = {
        date: new Date(),
        upper: upper!,
        lower: lower!,
        pulse: pulse!,
      };
      return dataPoint;
    }
    if (!checkUpper(upper)) {
      setInvalidUpper(true);
      return null
    }
    if (!checkLower(lower)) {
      setInvalidLower(true);
      return null
    }
    if (!checkPulse(pulse)) {
      setInvalidPulse(true);
      return null
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
          <input type="date" className={classes["date-input"]} />

          <input
            type="text"
            placeholder="upper"
            ref={upperRef}
            className={`${classes["input"]} ${invalidUpper && classes["red"]}`}
            onBlur={handleUpperBlur}
          />

          <input
            type="text"
            placeholder="lower"
            ref={lowerRef}
            className={`${classes["input"]} ${invalidLower && classes["red"]}`}
            onBlur={handleLowerBlur}
          />
          <input
            type="text"
            placeholder="heartbeat"
            ref={pulseRef}
            className={`${classes["input"]} ${invalidPulse && classes["red"]}`}
            onBlur={handlePulseBlur}
          />
        </div>
        <Button text="save" onClick={sumbitForm} />
      </form>
    </>
  );
};
