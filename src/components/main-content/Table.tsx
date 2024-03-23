import { useContext, useEffect, useState } from "react";
import classes from "./Table.module.scss";
import { Form } from "./Form";
import { ImgButton } from "../UI/ImgButton";
import { fetchData } from "../../store/data-functions";
import { DateDisplay } from "./DateDisplay";
import { LineChart } from "./Chart";
import { RoundButton } from "../UI/RoundButton";
import { Modal } from "../UI/Modal";
import { DataPick } from "./DataPick";
import { DatesContext } from "../../store/date-context";
import { fileURLToPath } from "url";
import { DataMenu } from "./DataMenu";
import { DataContext } from "../../store/data-context";
import { click } from "@testing-library/user-event/dist/click";
import { InactiveButton } from "../UI/InactiveButton";
import { Button } from "../UI/Button";
import { SmallButton } from "../UI/SmallButton";

type List = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}[];

const dummyList: List = [];

export const Table: React.FC = () => {
  const [number, setNumber] = useState(7);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const formHandler = () => {
    setIsFormOpen(!isFormOpen);
  };

  let [dataArray, setDataArray] = useState(dummyList);
  let [filteredDataArray, setFilteredDataArray] = useState(dummyList);
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

  const datesCtx = useContext(DatesContext);

  useEffect(() => {
    const setData = async () => {
      let data = await fetchData("gzl123n@gmail.com");
      setDataArray(data);
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

  let [message, setMessage] = useState("");
  let length = dataArray.length;
  const [clicks, setClicks] = useState(0);
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
    console.log(filteredArray);
    if (to > 0) {
      filteredArray = filteredArray.filter(
        (item) => Number(item.date.toString().slice(18, 28)) * 1000 < to
      );
    }
    console.log(filteredArray);
    if (filteredArray.length === 0) {
      setShownData(dataArray.slice(-number));
      // setMessage("data not found");
    } else {
      //setShownData(filteredArray);
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
    if (a < 0) {
      a = 0;
    }
    let b = length + number * (clicks + 1);
    if (b > length) {
      b = length;
    }

    setShownData(dataArray.slice(a, b));
    console.log(shownData);
  }, [clicks, datesCtx, number]);

  let dataCtx = useContext(DataContext);
  const [showDataMenu, setShowDataMenu] = useState(false);

  const dataMenuHandler = () => {
    setShowDataMenu(!showDataMenu);
    dataCtx.loadItems();
  };

  const showMoreElementsHandler = () => {
    setNumber(number + 1);
  };

  return (
    <>
      <h2>Your tonometer measurements:</h2>
      <div className={classes["options"]}>
        <div className={classes.buttons}>
          {-1 * clicks < maxClicks && (
            <ImgButton type="left-arrow" onClick={arrowHandlerLeft} />
          )}
          {clicks < -1 && (
            <ImgButton type="right-arrow" onClick={arrowHandlerRight} />
          )}
          <ImgButton type="edit" onClick={dataMenuHandler} />
          <DataPick />
          <SmallButton onClick={showMoreElementsHandler} text={"show more"} />
        </div>
      </div>
      <div className={classes["chart-and-form-container"]}>
        <div className={classes["chart-container"]}>
          <LineChart data={chartData} />
        </div>

        {showDataMenu && (
          <>
            <Modal />
            <div className={classes["data-menu-container"]}>
              <ImgButton type={"close"} onClick={dataMenuHandler} />
              <DataMenu data={shownData} />
            </div>
          </>
        )}

        <div className={"form-or-button-container"}>
          {isFormOpen && (
            <>
              <Modal />
              <div className={classes["form-container"]}>
                <ImgButton onClick={formHandler} type={"close"} />
                <Form />
              </div>
            </>
          )}
          <RoundButton onClick={formHandler} />
        </div>
      </div>
    </>
  );
};
