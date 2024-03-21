import { DatesContext } from "../../store/date-context";
import { Button } from "../UI/Button";
import classes from "./DataPick.module.scss";
import { useContext, useRef } from "react";

export const DataPick: React.FC<{ }> = (
  props
) => {
    let fromRef = useRef<HTMLInputElement>(null)
    let toRef = useRef<HTMLInputElement>(null)
    let currentFrom =  fromRef.current?.value
    let currentTo = fromRef.current?.value


    let datesCtx = useContext(DatesContext)

    // props.dateFrom(currentFrom)
    const submitForm = (event: React.FormEvent) => {
        event.preventDefault()
        if (currentFrom !== undefined){
            datesCtx.addDateFrom(currentFrom!)
        }
        
        
    }
    console.log(datesCtx)

  return (
    
    <form className={classes["date-options"]} onSubmit={submitForm}>

      <label>from:</label>
      <input type="date" ref={fromRef}/>
      <label>to:</label>
      <input type="date" ref={toRef}/>
      <Button text='apply' onClick={submitForm}/>
    </form>
  );
};
