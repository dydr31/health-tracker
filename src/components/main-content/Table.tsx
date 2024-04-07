import { useContext, useEffect, useState } from "react";
import classes from "./Table.module.scss";
import { fetchData } from "../../util/data-functions";
import { RoundButton } from "../UI/RoundButton";
import { DataPick } from "./DataPick/DataPick";
import { DatesContext } from "../../store/date-context";
import { DataContext } from "../../store/data-context";
import { LogInContext } from "../../store/login-context";
import { FormsStateContext } from "../../store/forms-state-context";
import { FormContainer } from "./Form/FormContainer";
import { DataMenuContainer } from "./DataMenu/DataMenuContainer";
import { ButtonsRow } from "./ButtonsRow/ButtonsRightSide";
import { ChartContainer } from "./Chart/ChartContainer";
import { ChartParenContainer } from "./Chart/ChartParentContainer";
import { ButtonsRowContainer } from "./ButtonsRow/ButtonRowContainer";

type List = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}[];

const dummyList: List = [{ date: "2020-01-01", upper: 0, lower: 0, pulse: 0 }];

const filterForShowing = (data: List, clicks: number, number: number) => {
  let len = data.length;
  let a = len + number * clicks;
  if (a <= 0) {
    a = 0;
  }
  let b = len + number * (clicks + 1);
  if (b > len) {
    b = len;
  } else if (b <= 0) {
    b = len + number * (clicks + 2);
  }
  console.log(a, b);
  return data.slice(a, b);
};

const getHoursFromString = (date: string) => {
  return (new Date(Number (date.toString().slice(18,28))  * 1000)).getHours()
}


export const Table: React.FC = () => {
  const datesCtx = useContext(DatesContext);
  const logInCtx = useContext(LogInContext);
  const dataCtx = useContext(DataContext);
  const formsStateCtx = useContext(FormsStateContext);

  let [dataArray, setDataArray] = useState(dummyList);
  const number = formsStateCtx.number;

  const [day, setDay] = useState(dummyList)

  const filterByDate = (data: List) => {
    data.sort((a, b) => {
      return (
        Number(a.date.toString().slice(18, 28)) -
        Number(b.date.toString().slice(18, 28))
      );
    });
  };

  const setData = async () => {
    let email = logInCtx.Email;
    let data = await fetchData(email);
    filterByDate(data);
    setDataArray(data);
    await dataCtx.loadItems(email);
    dataCtx.updateShownItems(data.slice(-number));
    // console.log(filterForDayAndEvening(data))
  };

  useEffect(() => {

    setData();
    console.log("set data");
  }, []);

  const clicks = formsStateCtx.clicks;
  let length = dataArray.length;

  useEffect(() => {
    // setData()
    
    let from = Number(datesCtx.dateFrom);
    let to = Number(datesCtx.dateTo);
    let filteredArray = dataArray;

    if (from > 0) {
      filteredArray = filteredArray.filter(
        (item) => Number(item.date.toString().slice(18, 28)) * 1000 >= from
      );
      setDataArray(filteredArray);
    }

    if (to > 0) {
      filteredArray = filteredArray.filter(
        (item) => Number(item.date.toString().slice(18, 28)) * 1000 <= to
      );
      setDataArray(filteredArray);
    }
    let res = filterForShowing(filteredArray, clicks, number);

    dataCtx.updateShownItems(res);
    setDataArray(filteredArray);
    console.log("filtered by date");
  }, [datesCtx]);

  useEffect(() => {
    let res = filterForShowing(dataArray, clicks, number);
    dataCtx.updateShownItems(res);
    console.log("filtered for showing");
  }, [clicks, number]);

  return (
    <>
      {/* {console.log(dataArray.length)} */}
      {/* {console.log(dataCtx.shownItems)} */}
      <div className={classes.table}>
        <h2>Your tonometer measurements:</h2>
        <ButtonsRowContainer/>
        <ChartParenContainer/>
        <DataPick />
        <DataMenuContainer />
        <FormContainer />
        <RoundButton onClick={() => formsStateCtx.toggleForm()} />
      </div>
    </>
  );
};
