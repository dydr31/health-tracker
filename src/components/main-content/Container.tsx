import { useContext, useEffect} from "react";
import classes from "./Container.module.scss";
import { RoundButton } from "./RoundButton";
import { DataPick } from "./Calendar/CalendarParentContainer";
import { DataContext } from "../../store/data-context";
import { LogInContext } from "../../store/login-context";

import { ChartParentContainer } from "./Chart/ChartParentContainer";
import { ButtonsRowContainer } from "./ButtonsRow/ButtonRowContainer";

import { ItemObj } from "../../types/types";
import { PickedDayDataContextProvider } from "../../store/picked-day-data-context";
import { FixedDateFormContainer } from "./FixedDateForm/FixedDateFormContainer";
import { ShownItemsContextProvider } from "../../store/shown-items-context";

export const sortByDate = (data: ItemObj[]) => {
  data.sort((a, b) => {
    return Number(a.date.seconds) - Number(b.date.seconds);
  });
};

export const Container: React.FC = () => {
  const { Email } = useContext(LogInContext);
  const { loadItems, updateShownItems, setItems, items } = useContext(DataContext);

  useEffect(() => {
    (async () => {
      let data = await loadItems(Email);
      sortByDate(data!);
      setItems(data!);
      updateShownItems(data!);
    })();
  }, [items]);

  return (
    <>
      <ShownItemsContextProvider>
        <div className={classes.table}>
          <ButtonsRowContainer />
          <ChartParentContainer />
          <PickedDayDataContextProvider>
            <DataPick />
            <FixedDateFormContainer />
            <RoundButton />
          </PickedDayDataContextProvider>
        </div>
      </ShownItemsContextProvider>
    </>
  );
};
