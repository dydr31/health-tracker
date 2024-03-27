import { useContext, useEffect, useState } from "react";
import classes from "./Table.module.scss";
import { Form } from "./Form/Form";
import { ImgButton } from "../UI/ImgButton";
import { fetchData } from "../../store/data-functions";
import { LineChart } from "./Chart";
import { RoundButton } from "../UI/RoundButton";
import { Modal } from "../UI/Modal";
import { DataPick } from "./DataPick";
import { DatesContext } from "../../store/date-context";
import { DataMenu } from "./DataMenu/DataMenu";
import { DataContext } from "../../store/data-context";
import { SmallButton } from "../UI/SmallButton";
import { LogInContext } from "../../store/login-context";
import { AnimatePresence, motion } from "framer-motion";
import {
  FormsStateContext,
  FormsStateContextProvider,
} from "../../store/forms-state";
import { FormContainer } from "./Form/FormContainer";
import { DataMenuContainer } from "./DataMenu/DataMenuContainer";

type List = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}[];

const dummyList: List = [{ date: "2020-01-01", upper: 0, lower: 0, pulse: 0 }];

export const Table: React.FC = () => {
  const [number, setNumber] = useState(7);

  const datesCtx = useContext(DatesContext);
  const logInCtx = useContext(LogInContext);
  const dataCtx = useContext(DataContext);
  const formsStateCtx = useContext(FormsStateContext);

  let [dataArray, setDataArray] = useState(dummyList);
  let [shownData, setShownData] = useState(dummyList);

  const [chartData, setChartData] = useState({
    labels: [""],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: ["rgb(100, 166, 237)"],
        borderColor: ["rgb(100, 166, 237)"],
      },
    ],
  });

  useEffect(() => {
    const setData = async () => {
      let email = logInCtx.Email;
      let data = await fetchData(email);
      setDataArray(data);
      await dataCtx.loadItems(email);
      //////////////////////////////////
      dataCtx.updateShownItems(data.slice(-number));
      setShownData(data.slice(-number));
    };
    setData();
  }, []);

  let datesData = shownData.map((item) => item.date.toString().slice(18, 28));
  let datesArr = datesData.map((item) => new Date(Number(item) * 1000));

  useEffect(() => {
    let datesArrStrings = datesArr.map((item) => item.toString().slice(4, 10));

    setChartData({
      labels: datesArrStrings,
      datasets: [
        {
          label: "pulse",
          data: shownData.map((item) => Number(item.pulse)),
          backgroundColor: ["rgb(232, 72, 85)"],
          borderColor: ["rgb(232, 72, 85)"],
        },
        {
          label: "upper",
          data: shownData.map((item) => Number(item.upper)),
          backgroundColor: ["rgb(239, 188, 213)"],
          borderColor: ["rgb(239, 188, 213)"],
        },
        {
          label: "lower",
          data: shownData.map((item) => Number(item.lower)),
          backgroundColor: ["rgb(100, 166, 237)"],
          borderColor: ["rgb(100, 166, 237)"],
        },
      ],
    });
  }, [shownData, number]);

  const [clicks, setClicks] = useState(-1);
  let length = dataArray.length;
  let maxClicks = length / number;

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
      ///////////////////////////////////
      dataCtx.updateShownItems(dataArray.slice(-number));
      setShownData(dataArray.slice(-number));
    } else {
      setDataArray(filteredArray);
    }
  }, [datesCtx]);

  const arrowHandlerRight = () => {
    setClicks(clicks + 1);
  };
  const arrowHandlerLeft = () => {
    setClicks(clicks - 1);
  };

  useEffect(() => {
    let a = length + number * clicks;
    if (a <= 0) {
      a = 0;
    }
    let b = length + number * (clicks + 1);
    if (b > length) {
      b = length;
    }
    /////////////////////////////////////
    dataCtx.updateShownItems(dataArray.slice(a, b));
    setShownData(dataArray.slice(a, b));
  }, [clicks, datesCtx]);

  const dataMenuHandler = () => {
    let email = logInCtx.Email;
    dataCtx.loadItems(email);
    formsStateCtx.toggleDataMenu();
  };

  const showMoreElementsHandler = () => {
    setNumber(number + 1);
  };

  return (
    <>
      {/* {console.log(dataCtx.shownItems)} */}
      <h2>Your tonometer measurements:</h2>
      <div className={classes["options"]}>
        <div className={classes.buttons}>
          {-1 * clicks < maxClicks && (
            <ImgButton type="left-arrow" onClick={arrowHandlerLeft} />
          )}
          {clicks < -1 && (
            <ImgButton type="right-arrow" onClick={arrowHandlerRight} />
          )}
          <ImgButton type="menu" onClick={dataMenuHandler} />

          <DataPick />

          <div className={classes["dont-show-on-mobile"]}>
            <SmallButton onClick={showMoreElementsHandler} text={"show more"} />
          </div>
        </div>
      </div>

      <motion.div className={classes["chart-and-form-container"]}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ bounce: 0, duration: 0.5 }}
            className={classes["chart-container"]}
          >
            <LineChart data={chartData} />
          </motion.div>
        </AnimatePresence>
        <DataMenuContainer />
        <FormContainer />
        <RoundButton onClick={() => formsStateCtx.toggleForm()} />
      </motion.div>
    </>
  );
};
