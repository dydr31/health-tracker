import { ChartContainer } from "./ChartContainer";
import { DataContext } from "../../../store/data-context";
import { useContext } from "react";

import classes from "./ChartParentContainer.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";
import { DropdownWrapper } from "../../UI/DropdownWrapper";

type List = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}[];

const getHoursFromString = (date: string) => {
  return new Date(Number(date.toString().slice(18, 28)) * 1000).getHours();
};

export const filterForDayAndEvening = (data: List) => {
  data.map((x) => console.log(getHoursFromString(x.date)));
  let daily = data.filter(
    (x) => getHoursFromString(x.date) < 17 || getHoursFromString(x.date) <= 6
  );
  let evening = data.filter(
    (x) => getHoursFromString(x.date) >= 16 && getHoursFromString(x.date) > 6
  );
  return { daily: daily, evening: evening };
};

export const ChartParenContainer: React.FC = () => {
  let { shownItems } = useContext(DataContext);

  let data = filterForDayAndEvening(shownItems);
  let daily = filterForDayAndEvening(shownItems).daily;
  let evening = filterForDayAndEvening(shownItems).evening;

  const { type, toggleType } = useContext(FormsStateContext);

  return (
    <div className={classes["chart-parent-container"]}>
      {type && (
        <DropdownWrapper key='c1' className={classes["chart-subcontainer"]}>
       
          {/* <label>Daily Measurements:</label> */}
          <ChartContainer data={daily} />
        
        </DropdownWrapper>
      )}
      {!type && (
        <DropdownWrapper className={classes["chart-subcontainer"]} key='c2'>
        
          {/* <label>Evening Measurements:</label> */}
          <ChartContainer data={evening} />
      
        </DropdownWrapper>
      )}
    </div>
  );
};
