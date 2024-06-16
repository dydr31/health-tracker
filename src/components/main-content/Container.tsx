import { useContext, useEffect, useState } from "react";
import classes from "./Container.module.scss";
import { RoundButton } from "./RoundButton";
import { DataPick } from "./DataMenu/DataPick";
import { DataContext } from "../../store/data-context";
import { LogInContext } from "../../store/login-context";
import { FormsStateContext } from "../../store/forms-state-context";


import { ChartParentContainer } from "./Chart/ChartParentContainer";
import { ButtonsRowContainer } from "./ButtonsRow/ButtonRowContainer";

import { sortByDate } from "./Container-functions";
import {
  DayDataContext,
  DayDataContextProvider,
} from "../../store/day-data-context";

import { FixedDateFormContainer } from "./FixedDateForm/FixedDateFormContainer";

let modifiedList = [{ date: "", upper: 0, lower: 0, pulse: 0, grouped: false }];

export const Container: React.FC = () => {
  const { Email } = useContext(LogInContext);
  const { shownItems, items, loadItems, updateShownItems, setItems } =
    useContext(DataContext);
  const { number, toggleForm, clicks, setFixedDateMenu, fixedDateMenu } =
    useContext(FormsStateContext);
  let [dataArray, setDataArray] = useState(modifiedList);
  let { morningData, setMorningDataHandler, setEveningDataHandler } =
    useContext(DayDataContext);

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
        <DayDataContextProvider>
          <DataPick />
          <FixedDateFormContainer />
          <RoundButton/>
        </DayDataContextProvider>
        
      </div>
    </>
  );
};
