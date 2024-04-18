import { ChartContainer } from "./ChartContainer";
import { DataContext } from "../../../store/data-context";
import { useContext } from "react";

import classes from "./ChartParentContainer.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";
import { DropdownWrapper } from "../../UI/DropdownWrapper";

export const ChartParentContainer: React.FC = () => {
  const { morningItems, eveningItems } = useContext(DataContext);
  const { isSplit } = useContext(FormsStateContext);

  return (
    <>
      <div className={classes["chart-parent-container"]}>
       
          <DropdownWrapper key="c1" className={classes["chart-subcontainer"]}>
            <h3>Morning data:</h3>
            <ChartContainer data={morningItems} key='chart1'/>
          </DropdownWrapper>
        
        
          <DropdownWrapper className={classes["chart-subcontainer"]} key="c2">
            <h3>Evening data:</h3>
            <ChartContainer data={eveningItems} key='chart2'/>
          </DropdownWrapper>
        
      </div>   
    </>
  );
};
