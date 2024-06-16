import { ChartLegend } from "../Chart/ChartLegend";
import { ButtonsRow } from "./NavButtons";
import classes from "./ButtonRowContainer.module.scss";
import { TimeOfDayButtons } from "./TimeOfDayButtons";

export const ButtonsRowContainer: React.FC = () => {
  return (
    <div className={classes["button-row-container"]}>
      <TimeOfDayButtons />
      <ButtonsRow />
    </div>
  );
};
