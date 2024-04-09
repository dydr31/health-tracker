import { useContext, useEffect, useState } from "react";
import classes from "./Table.module.scss";
import { fetchData } from "../../util/data-functions";
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
import {
  filterForShowing,
  filterByDate,
  filterForDayAndEvening,
} from "./Table-functions";
import { dummyList } from "./Table-functions";
import { ChartLegend } from "./ButtonsRow/ChartLegend";

export const Table: React.FC = () => {
  const { dateFrom, dateTo } = useContext(DatesContext);
  const { Email } = useContext(LogInContext);
  const { updateShownItems, loadItems } = useContext(DataContext);
  const { number, toggleForm, clicks } = useContext(FormsStateContext);
  let [dataArray, setDataArray] = useState(dummyList);

  useEffect(() => {
    (async () => {
      let data = await fetchData(Email);
      filterByDate(data);
      setDataArray(data);
      await loadItems(Email);
      updateShownItems(data.slice(-number));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let data = await fetchData(Email);
      filterByDate(data);
      setDataArray(data);
    })();

    let from = Number(dateFrom);
    let to = Number(dateTo);
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
    let result = filterForShowing(filteredArray, clicks, number);

    updateShownItems(result);
    setDataArray(filteredArray);
  }, [dateFrom, dateTo]);

  useEffect(() => {
    let result = filterForShowing(dataArray, clicks, number);
    updateShownItems(result);
  }, [clicks, number]);

  const { isChart } = useContext(FormsStateContext);
  return (
    <>
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

        {!isChart && <DataMenuContainer />}
        <FormContainer />
        <RoundButton onClick={() => toggleForm()} />
      </div>
    </>
  );
};
