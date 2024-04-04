import { useContext, useEffect, useState } from "react";
import classes from "./Table.module.scss";
import { fetchData } from "../../util/data-functions";
import { RoundButton } from "../UI/RoundButton";
import { DataPick } from "./DataPick/DataPick";
import { DatesContext } from "../../store/date-context";
import { DataContext } from "../../store/data-context";
import { LogInContext } from "../../store/login-context";
import {
  FormsStateContext,
} from "../../store/forms-state-context";
import { FormContainer } from "./Form/FormContainer";
import { DataMenuContainer } from "./DataMenu/DataMenuContainer";
import { ButtonsRow } from "./ButtonsRow/ButtonsRow";
import { ChartContainer } from "./Chart/ChartContainer";

type List = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}[];

const dummyList: List = [{ date: "2020-01-01", upper: 0, lower: 0, pulse: 0 }];

const filterForShowing = (data: List, clicks: number, number: number) => {
  let len = data.length
  let a = len + number * clicks;
  if (a <= 0) {
    a = 0;
  }
  let b = len + number * (clicks + 1);
  if (b > len) {
    b = len;
  }
  return data.slice(a, b)

}

export const Table: React.FC = () => {
  const datesCtx = useContext(DatesContext);
  const logInCtx = useContext(LogInContext);
  const dataCtx = useContext(DataContext);
  const formsStateCtx = useContext(FormsStateContext);

  let [dataArray, setDataArray] = useState(dummyList);
  const number = formsStateCtx.number;


  const filterData = (data: List) => {
    data.sort((a,b) => {
      return Number (a.date.toString().slice(18,28)) -  Number (b.date.toString().slice(18,28))
    })

  }


  useEffect(() => {
    const setData = async () => {
      let email = logInCtx.Email;
      let data = await fetchData(email);
      filterData(data)
      //dataCtx.setItems(data)
      setDataArray(data);
      await dataCtx.loadItems(email);
      dataCtx.updateShownItems(data.slice(-number));
    };
    setData();
    console.log('set data')
  }, []);



  const clicks = formsStateCtx.clicks;
  let length = dataArray.length;

  useEffect(() => {
    let from = Number(datesCtx.dateFrom);
    let to = Number(datesCtx.dateTo);
    let filteredArray = dataArray;

    if (from > 0) {
      filteredArray = filteredArray.filter(
        (item) => Number(item.date.toString().slice(18, 28)) * 1000 >= from
      );
      setDataArray(filteredArray)
    }

    if (to > 0) {
      filteredArray = filteredArray.filter(
        (item) => Number(item.date.toString().slice(18, 28)) * 1000 <= to
      );
      setDataArray(filteredArray)
    }


    // if (filteredArray.length === 0) {
    //   dataCtx.updateShownItems(dataArray.slice(-number));
    // } else {
    //   setDataArray(filteredArray);
    // }

    // console.log(filteredArray)
    let res = filterForShowing(filteredArray, clicks, number)

    dataCtx.updateShownItems(res)
    setDataArray(filteredArray)
    console.log('filtered by date')

  }, [datesCtx]);



  useEffect(() => {
    let res = filterForShowing(dataArray, clicks, number)
    dataCtx.updateShownItems(res)
    console.log('filtered for showing')
  }, [clicks, number]);


  return (
    <>
    {console.log(dataArray.length)}
    {/* {console.log(dataCtx.shownItems)} */}
    <div className={classes.table}>
      <h2>Your tonometer measurements:</h2>
      <ButtonsRow />
      <ChartContainer/>
      <DataPick />
      <DataMenuContainer />
      <FormContainer />
      <RoundButton onClick={() => formsStateCtx.toggleForm()} />
    </div>
    </>
  );
};
