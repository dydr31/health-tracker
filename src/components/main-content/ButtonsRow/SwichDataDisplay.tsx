import { SmallButton } from "../../UI/buttons/SmallButton";
import { useContext, useState } from "react";
import classes from './SwicthDataDisplay.module.scss'
import { FormsStateContext } from "../../../store/forms-state-context";
import { ImgButton } from "../../UI/buttons/ImgButton";

export const SwitchDataDisplay: React.FC = () => {
  const {isChart, toggleChart} = useContext(FormsStateContext)
  const chartHandler = () => {
    toggleChart(true);
  };
  const tableHandler = () => {
    toggleChart(false)
  }
  console.log(isChart)

  return (
    <div className={classes['swich-data-display']}>
      <ImgButton type="chart" onClick={chartHandler} active={isChart} />
      <ImgButton type="table" onClick={tableHandler} active={!isChart} />
    </div>
  );
};
