import { ChartContainer } from "./ChartContainer";
import { DataContext } from "../../../store/data-context";
import { useContext } from "react";

import classes from "./ChartParentContainer.module.scss";
import { DropdownWrapper } from "../../UI/DropdownWrapper";
import { FormsStateContext } from "../../../store/forms-context";
import { ChartLegend } from "../ButtonsRow/ChartLegend";

export const ChartParentContainer: React.FC = () => {
  const { morningItems, eveningItems } = useContext(DataContext);
  const { isMorning } = useContext(FormsStateContext);

  return (
    <>
      <div className={classes["chart-parent-container"]}>
        {isMorning && (
          <DropdownWrapper key="c1" className={classes["chart-subcontainer"]}>
            <h3>Morning data:</h3>
            <ChartContainer data={morningItems} key="chart1" />
          </DropdownWrapper>
        )}

        {!isMorning && (
          <DropdownWrapper className={classes["chart-subcontainer"]} key="c2">
            <h3>Evening data:</h3>
            <ChartContainer data={eveningItems} key="chart2" />
          </DropdownWrapper>
        )}
      </div>
      <ChartLegend/>
    </>
  );
};
