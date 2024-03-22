import React, { RefObject, useEffect, useRef, useState } from "react";
import { addDataPoint } from "../../store/data-functions";
import { Button } from "../UI/Button";
import classes from "./Form.module.scss";

export const Form: React.FC = (props) => {
  const upperRef = useRef<HTMLInputElement>(null);
  const lowerRef = useRef<HTMLInputElement>(null);
  const pulseRef = useRef<HTMLInputElement>(null);

  const sumbitForm = (event: React.FormEvent) => {
    event.preventDefault();
    let checkData = checkForm();
    if (checkData !== null) {
      addDataPoint("gzl123n@gmail.com", [checkData!]);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  let [invalidUpper, setInvalidUpper] = useState(false);
  const checkForm = () => {
    const upper = upperRef.current!.value;
    const lower = lowerRef.current!.value;
    const pulse = pulseRef.current!.value;
    let checkUpper = Number(upper);
    console.log(checkUpper);
    let checkLower = Number(lower);
    let checkPulse = Number(pulse);
    if (checkUpper <= 370 && checkUpper >= 50) {
      if (checkLower >= 20 && checkLower <= 360) {
        if (checkPulse >= 26 && checkPulse <= 600) {
          let dataPoint = {
            date: new Date(),
            upper: checkUpper!,
            lower: checkLower!,
            pulse: checkPulse!,
          };
          console.log(dataPoint);
          return dataPoint;
        } else {
          console.log("measurements invalid");
          return null;
        }
      }
    } else {
      return null;
    }
  };

  const handleUpperBlur = () => {
    const upper = Number(upperRef.current!.value);
    if (upper <= 370 && upper >= 50) {
      setInvalidUpper(false);
      console.log("valid");
    } else {
      setInvalidUpper(true);
    }
  };

  return (
    <>
      {console.log(invalidUpper)}
      <form className={classes.form} onSubmit={sumbitForm}>
        <div>
          <input type="date" className={classes["date-input"]} />
          <div>
            <input
              type="text"
              placeholder="upper"
              ref={upperRef}
              className={`${classes["input"]} ${
                invalidUpper && classes["red"]
              }`}
              onBlur={handleUpperBlur}
            />
            <p className={classes["red-text"]}>value invalid</p>
          </div>

          <input
            type="text"
            placeholder="lower"
            ref={lowerRef}
            className={classes["input"]}
          />
          <input
            type="text"
            placeholder="heartbeat"
            ref={pulseRef}
            className={classes["input"]}
          />
        </div>
        <Button text="save" onClick={sumbitForm} />
      </form>
    </>
  );
};
