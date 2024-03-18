import React, { RefObject, useRef, useState } from "react";
import { addDataPoint } from "../../store/data-functions";
import { Button } from "../UI/Button";
import classes from "./Form.module.scss";

export const Form: React.FC = (props) => {
  
  const sumbitForm = (event: React.FormEvent) => {
    event.preventDefault();
    let result = checkForm();
    if (result !== null){
        addDataPoint("gzl123n@gmail.com", "Гузель Гузель", [result!])
    }
    setTimeout(() => {
      window.location.reload();
    }, 1500) 
  };

  const checkForm = () => {
    const upper = upperRef.current!.value;
    const lower = lowerRef.current!.value;
    const pulse = pulseRef.current!.value;
    let checkUpper = Number(upper);
    let checkLower = Number(lower);
    let checkPulse = Number(pulse);
    if (
      checkUpper <= 370 &&
      checkUpper >= 50 &&
      checkLower >= 20 &&
      checkLower <= 360 &&
      checkPulse >= 26 &&
      checkPulse <= 600
    ) {
        let dataPoint = {
                date: new Date(),
                upper: checkUpper!,
                lower: checkLower!,
                pulse: checkPulse!,
            }
            console.log(dataPoint)
            return dataPoint
    } else {
        console.log('measurements invalid')
        return null
    }
  };

  const upperRef = useRef<HTMLInputElement>(null);

  const lowerRef = useRef<HTMLInputElement>(null);

  const pulseRef = useRef<HTMLInputElement>(null);

  return (
    <form className={classes.form} onSubmit={sumbitForm}>
      <div>
        <input type="date" className={classes['date-input']}/>
        <input type="text" placeholder="upper" ref={upperRef} className={classes['input']}/>
        <input type="text" placeholder="lower" ref={lowerRef} className={classes['input']}/>
        <input type="text" placeholder="heartbeat" ref={pulseRef} className={classes['input']}/>
      </div>
      <Button text="save" onClick={sumbitForm} />
    </form>
  );
};
