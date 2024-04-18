import { useContext, useEffect, useState } from "react";
import classes from "./Table.module.scss";
import { RoundButton } from "../UI/buttons/RoundButton";
import { DataPick } from "./DataPick/DataPick";
import { DatesContext } from "../../store/date-context";
import { DataContext } from "../../store/data-context";
import { LogInContext } from "../../store/login-context";
import { FormsStateContext } from "../../store/forms-state-context";
import { FormContainer } from "./Form/FormContainer";
import { DataMenuContainer } from "./DataMenu/DataMenuContainer";
import { ChartParentContainer } from "./Chart/ChartParentContainer";
import { ButtonsRowContainer } from "./ButtonsRow/ButtonRowContainer";
import { ChartLegend } from "./ButtonsRow/ChartLegend";

import {  sortByDate } from "./Table-ulils";
import { restructuredItems } from "./Table-ulils";

let modifiedList = [{date: '', upper: 0, lower: 0, pulse: 0, grouped: false}]

export const Table: React.FC = () => {
  const { dateFrom, dateTo } = useContext(DatesContext);
  const { Email } = useContext(LogInContext);
  const { shownItems, items, loadItems, updateShownItems, setItems } = useContext(DataContext);
  const { number, toggleForm, clicks } = useContext(FormsStateContext);
  let [dataArray, setDataArray] = useState(modifiedList);

  useEffect(() => {
    (async () => {
      let data = await loadItems(Email)
      sortByDate(data!)
      setItems(data!)
      updateShownItems(data!)
      // let restructured = restructuredItems(data!)
      // // console.log(restructured)
      // updateShownItems(restructured)
      


      //setDataArray(data);
      //await loadItems(Email);
      //updateShownItems(data.slice(-number));
      
      // let grouped = groupTheSame(data)
      // setDataArray(grouped)
      // updateShownItems(grouped!.slice(-number));
      // setGroupedItems(grouped)

    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     let data = await fetchData(Email);
  //     filterByDate(data);
  //     //setDataArray(data);
  //     //data type changed to ModifiedList
  //     let grouped = groupTheSame(data)
  //     setDataArray(grouped)
  //   })();

  //   let from = Number(dateFrom);
  //   let to = Number(dateTo);
  //   let filteredArray = dataArray;

  //   if (from > 0) {
  //     filteredArray = filteredArray.filter(
  //       (item) => Number(item.date.toString().slice(18, 28)) * 1000 >= from
  //     );
  //     setDataArray(filteredArray);
  //   }

  //   if (to > 0) {
  //     filteredArray = filteredArray.filter(
  //       (item) => Number(item.date.toString().slice(18, 28)) * 1000 <= to
  //     );
  //     setDataArray(filteredArray);
  //   }
  //   // let result = filterForShowing(filteredArray, clicks, number);

  //   // updateShownItems(result);
  //   setDataArray(filteredArray);
  // }, [dateFrom, dateTo]);

  // useEffect(() => {
  //   let result = filterForShowing(dataArray, clicks, number);
  //   updateShownItems(result);
  // }, [clicks, number]);

  const { isChart } = useContext(FormsStateContext);
  return (
    <>
    {/* {console.log(items)}
    {console.log(shownItems)} */}
      <div className={classes.table}>
        {/* <h2>Your tonometer measurements:</h2> */}
        <ButtonsRowContainer />

        {isChart && (
          <>
            {" "}
            <ChartParentContainer />
            <ChartLegend />{" "}
          </>
        )}

        <DataPick />

        {/* {!isChart &&  */}
        <DataMenuContainer />
        {/* // } */}
        <FormContainer />
        <RoundButton onClick={() => toggleForm()} />
      </div>
    </>
  );
};
