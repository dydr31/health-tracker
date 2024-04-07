import { useContext, useState } from "react";
import { Button } from "../../UI/Button";
import { SmallButton } from "../../UI/SmallButton";
import classes from "./ButtonsDayOrEvening.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";

export const ButtonsDayOrEvening: React.FC = () => {
    const {type, toggleType} = useContext(FormsStateContext)

    const onClickHandler = () => {
        toggleType()
    }
  return (
    <div className={classes['day-or-evening']}>
      <SmallButton text="day" onClick={onClickHandler} active={type}/>
      <SmallButton text="evening" onClick={onClickHandler} active={!type}/>
    </div>
  );
};
