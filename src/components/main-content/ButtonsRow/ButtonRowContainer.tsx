import { ChartLegend } from "./ChartLegend";
import { ButtonsRow } from "./ButtonsRightSide";
import classes from "./ButtonRowContainer.module.scss";
import { SwitchDataDisplay } from "./SwichDataDisplay";

export const ButtonsRowContainer: React.FC = () => {
  return (
    <div className={classes["button-row-container"]}>
      <SwitchDataDisplay />
      <ButtonsRow />
    </div>
  );
};
