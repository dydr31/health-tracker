import { SmallButton } from "../../UI/buttons/SmallButton";
import { useContext, useState } from "react";
import classes from "./DisplayButtons.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";
import { ImgButton } from "../../UI/buttons/ImgButton";

export const DisplayButtons: React.FC = () => {
  const { toggleChart, toggleSplit } = useContext(FormsStateContext);

  const chartHandler = () => {
    toggleChart(true);
  };
  const tableHandler = () => {
    toggleChart(false);
  };
  const splitHandler = () => {
    toggleSplit(true);
  };
  const mergeHandler = () => {
    toggleSplit(false);
  };

  return (
    <div className={classes["display-buttons"]}>
      <div className={classes["display-buttons__select-view"]}>
        <label className={classes["display-buttons__select-view__label"]}>
          Display settings:
        </label>
        <div className={classes['display-buttons__select-view__options-container']}>
          <select className={classes["display-buttons__select-view__select"]}>
            <option value="split" onClick={splitHandler}>
              split
            </option>
            <option value="together" onClick={mergeHandler}>
              display all
            </option>
          </select>
          <select className={classes["display-buttons__select-view__select"]}>
            <option value="chart" onClick={chartHandler}>
              chart
            </option>
            <option value="table" onClick={tableHandler}>
              table
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
