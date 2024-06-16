import { ChartContainer } from "./ChartContainer";
import { DataContext } from "../../../store/data-context";
import { useContext, useEffect, useState } from "react";

import classes from "./ChartParentContainer.module.scss";
import { DropdownWrapper } from "../../UI/DropdownWrapper";
import { FormsStateContext } from "../../../store/forms-context";
import { ChartLegend } from "./ChartLegend";
import { ShownItemsContext } from "../../../store/shown-items-context";

export const ChartParentContainer: React.FC = () => {
  const { morningItems, eveningItems } = useContext(DataContext);
  const { isMorning } = useContext(FormsStateContext);

  const { n, clicks, setMaxClicks } = useContext(ShownItemsContext);

  const [slicedItems, setSlicedItems] = useState(morningItems);

  useEffect(() => {
    if (isMorning) {
      setMaxClicks(Math.floor(morningItems.length / n));
      
    } else {
      setMaxClicks(Math.floor(eveningItems.length / n) );
      
    }
  }, [isMorning, morningItems, eveningItems]);

  useEffect(() => {
    let items = morningItems;
    if (!isMorning) {
      items = eveningItems;
    }
    if (clicks > 0) {
      let range = [-(clicks + 1) * n, -clicks * n];
      console.log(range);
      setSlicedItems(items.slice(range[0], range[1]));
    }
    if (clicks < 0) {
      console.log("its future");
    }
    if (clicks === 0) {
      setSlicedItems(items.slice(-n));
      console.log("default week");
    }
  }, [morningItems, clicks, isMorning]);

  return (
    <>
      <div className={classes["chart-parent-container"]}>
        <DropdownWrapper key="cn" className={classes["chart-subcontainer"]}>
          {isMorning && <h3>Morning data:</h3>}
          {!isMorning && <h3>Evening data:</h3>}
          <ChartContainer data={slicedItems} key="chart1" />
        </DropdownWrapper>
      </div>
      <ChartLegend />
    </>
  );
};
