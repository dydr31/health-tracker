import { DatesContext } from "../../store/date-context";
import { Button } from "../UI/Button";
import classes from "./DataPick.module.scss";
import { useContext, useRef } from "react";

export const DataPick: React.FC = () => {
  let fromRef = useRef<HTMLInputElement>(null);
  let toRef = useRef<HTMLInputElement>(null);

  let datesCtx = useContext(DatesContext);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    let currentFrom = fromRef.current!.value;
    let currentTo = toRef.current!.value;

    datesCtx.addDateFrom(currentFrom!);

    datesCtx.addDateTo(currentTo!);

    
  };

  return (
    <form className={classes["date-options"]} onSubmit={submitForm}>
      <label>from:</label>
      <input type="date" ref={fromRef} className={classes.input} required />
      <label>to:</label>
      <input type="date" ref={toRef} className={classes.input} required />
      <Button text="apply" onClick={submitForm} />
    </form>
  );
};
