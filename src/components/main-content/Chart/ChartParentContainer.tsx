import { ChartContainer } from "./ChartContainer";
import { DataContext } from "../../../store/data-context";
import { useContext } from "react";

import classes from "./ChartParentContainer.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";
import { DropdownWrapper } from "../../UI/DropdownWrapper";



export const ChartParentContainer: React.FC = () => {
  const {morningItems, eveningItems} = useContext(DataContext)
  const { type } = useContext(FormsStateContext);

  return (
    <div className={classes["chart-parent-container"]}>
      {type && (
        <DropdownWrapper key='c1' className={classes["chart-subcontainer"]}>
          <ChartContainer data={morningItems} />
        </DropdownWrapper>
      )}
      {!type && (
        <DropdownWrapper className={classes["chart-subcontainer"]} key='c2'>
          <ChartContainer data={eveningItems} />
        </DropdownWrapper>
      )}
    </div>
  );
};
