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

export const Table: React.FC = () => {
  const datesCtx = useContext(DatesContext);
  const logInCtx = useContext(LogInContext);
  const dataCtx = useContext(DataContext);
  const formsStateCtx = useContext(FormsStateContext);

  let [dataArray, setDataArray] = useState(dummyList);
  const number = formsStateCtx.number;



  useEffect(() => {
    const setData = async () => {
      let email = logInCtx.Email;
      let data = await fetchData(email);
      setDataArray(data);
      await dataCtx.loadItems(email);
      dataCtx.updateShownItems(data.slice(-number));
    };
    setData();
  }, []);



  const clicks = formsStateCtx.clicks;
  let length = dataArray.length;

  useEffect(() => {
    let from = Number(datesCtx.dateFrom);
    let to = Number(datesCtx.dateTo);
    let filteredArray = dataArray;

    if (from > 0) {
      filteredArray = filteredArray.filter(
        (item) => Number(item.date.toString().slice(18, 28)) * 1000 > from
      );
    }

    if (to > 0) {
      filteredArray = filteredArray.filter(
        (item) => Number(item.date.toString().slice(18, 28)) * 1000 < to
      );
    }

    if (filteredArray.length === 0) {
      dataCtx.updateShownItems(dataArray.slice(-number));
    } else {
      setDataArray(filteredArray);
    }
  }, [datesCtx]);



  useEffect(() => {
    let a = length + number * clicks;
    if (a <= 0) {
      a = 0;
    }
    let b = length + number * (clicks + 1);
    if (b > length) {
      b = length;
    }
    dataCtx.updateShownItems(dataArray.slice(a, b))
  }, [clicks, datesCtx, number]);


  return (
    <>
      <h2>Your tonometer measurements:</h2>
      <ButtonsRow />
      <ChartContainer/>
      <DataPick />
      <DataMenuContainer />
      <FormContainer />
      <RoundButton onClick={() => formsStateCtx.toggleForm()} />
    </>
  );
};
