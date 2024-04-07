import { useContext, useState } from "react";
import { Button } from "../../UI/Button";
import { SmallButton } from "../../UI/SmallButton";
import classes from "./ButtonsDayOrEvening.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";

export const ButtonsDayOrEvening: React.FC = () => {
  const { type, toggleType } = useContext(FormsStateContext);

  return (
    <div className={classes["day-or-evening"]}>
      <SmallButton text="day" onClick={() => toggleType(true)} active={type} />
      <SmallButton
        text="evening"
        onClick={() => toggleType(false)}
        active={!type}
      />
    </div>
  );
};
