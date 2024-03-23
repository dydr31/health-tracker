import React, { useContext, useRef, useState } from "react";
import { addDataPoint } from "../../store/data-functions";
import { Button } from "../UI/Button";
import classes from "./Form.module.scss";
import { LogInContext } from "../../store/login-context";

export const Form: React.FC = (props) => {

  const upperRef = useRef<HTMLInputElement>(null);
  const lowerRef = useRef<HTMLInputElement>(null);
  const pulseRef = useRef<HTMLInputElement>(null);

  const logInCtx = useContext(LogInContext)

  const sumbitForm = (event: React.FormEvent) => {
    event.preventDefault();
    let checkData = checkForm();
    if (checkData !== null) {
      let email = logInCtx.Email
      addDataPoint(email, [checkData!]);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  let [invalidUpper, setInvalidUpper] = useState(false);
  let [invalidLower, setInvalidLower] = useState(false);
  let [invalidPulse, setInvalidPulse] = useState(false);

  const checkUpper = (upper: number) => {
    if (upper <= 370 && upper >= 50) {
      return true
    } else {
      return false
    }
  }

  const checkLower = (lower: number) => {
    if (lower >= 20 && lower <= 360) {
      return true
    } else {
      return false
    }
  }

  const checkPulse = (pulse: number) => {
    if (pulse >= 26 && pulse <= 600) {
      return true
    } else {
      return false
    }
  }

  const checkForm = () => {
    let upper = Number(upperRef.current!.value);
    let lower = Number(lowerRef.current!.value);
    let pulse = Number(pulseRef.current!.value);

    if (checkUpper(upper) === true) {

      if (checkLower(lower) === true) {

        if (checkPulse(pulse) === true) {
          let dataPoint = {
            date: new Date(),
            upper: upper!,
            lower: lower!,
            pulse: pulse!,
          };
          console.log(dataPoint);
          return dataPoint;
        } else {
          console.log("measurements invalid");
          return null;
        }
      }

      setInvalidLower(true);

      if (checkPulse(pulse) === false) {

        setInvalidPulse(true)
        return null;
      }
      return null;

    } else {
      setInvalidUpper(true);
      console.log(pulse);
      if (checkLower(lower) === false) {
        setInvalidLower(true);
      }
      if (checkPulse(pulse) === false) {
        setInvalidPulse(true);
      }
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
