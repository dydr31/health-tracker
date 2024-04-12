import { ChartLegend } from "./ChartLegend";
import { ButtonsRow } from "./ButtonsRightSide";
import classes from "./ButtonRowContainer.module.scss";
import { DisplayButtons } from "./DisplayButtons";

export const ButtonsRowContainer: React.FC = () => {
  return (
    <div className={classes["button-row-container"]}>
      <DisplayButtons />
      <ButtonsRow />
    </div>
  );
};
