import { useContext, useEffect, useState } from "react";
import classes from "./Container.module.scss";
import { RoundButton } from "./RoundButton";
import { DataPick } from "./DataMenu/DataPick";
import { DataContext } from "../../store/data-context";
import { LogInContext } from "../../store/login-context";
import { FormsStateContext } from "../../store/forms-context";


import { ChartParentContainer } from "./Chart/ChartParentContainer";
import { ButtonsRowContainer } from "./ButtonsRow/ButtonRowContainer";

import { sortByDate } from "./Container-functions";
import {
  PickedDayDataContext,
  PickedDayDataContextProvider,
} from "../../store/picked-day-data-context";

import { FixedDateFormContainer } from "./FixedDateForm/FixedDateFormContainer";

let modifiedList = [{ date: "", upper: 0, lower: 0, pulse: 0, grouped: false }];

export const Container: React.FC = () => {
  const { Email } = useContext(LogInContext);
  const { shownItems, items, loadItems, updateShownItems, setItems } =
    useContext(DataContext);

  let [dataArray, setDataArray] = useState(modifiedList);
  let { morningData, setMorningDataHandler, setEveningDataHandler } =
    useContext(PickedDayDataContext);

  useEffect(() => {
    (async () => {
      let data = await loadItems(Email);
      sortByDate(data!);
      setItems(data!);
      updateShownItems(data!);
    })();
  }, []);


  // useEffect(() => {
  //   console.log("aaaa");
  //   console.log(morningData)
  // }, [morningData, fixedDateMenu]);

  return (
    <>
      <div className={classes.table}>
        <ButtonsRowContainer />
        <ChartParentContainer />
        <PickedDayDataContextProvider>
          <DataPick />
          <FixedDateFormContainer />
          <RoundButton/>
        </PickedDayDataContextProvider>
        
      </div>
    </>
  );
};
