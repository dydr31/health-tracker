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

type List = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}[];

const dummyList: List = [];

export const Table: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const formHandler = () => {
    setIsFormOpen(!isFormOpen);
  };

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

  const datesCtx = useContext(DatesContext);

  useEffect(() => {
    const setData = async () => {
      let data = await fetchData("gzl123n@gmail.com", "Гузель Гузель");
      setDataArray(data);
      setShownData(data.slice(-14));
    };
    setData();
    console.log("first use effect");
  }, []);

  let datesData = shownData.map((item) => item.date.toString().slice(18, 28));
  let datesArr = datesData.map((item) => new Date(Number(item) * 1000));

  useEffect(() => {
    let datesArrStrings = datesArr.map((item) => item.toString().slice(4, 21));

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
  }, [shownData]);

  let [message, setMessage] = useState("");

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
      setShownData(dataArray.slice(-14));
      setMessage("data not found");
    } else {
      setShownData(filteredArray);
    }
  }, [datesCtx]);

  const arrowHandlerRight = () => {
    setShownData(dataArray.slice(-14));
  };
  const arrowHandlerLeft = () => {
    let length = dataArray.length;
    setShownData(dataArray.slice(0, length - 14));
  };

  const [showDataMenu, setShowDataMenu] = useState(false);

  const dataMenuHandler = () => {
    setShowDataMenu(!showDataMenu);
  };

  return (
    <>
      <h2>Your tonometer measurements:</h2>
      <div className={classes["options"]}>
        <div className={classes.buttons}>
          <ImgButton type="left-arrow" onClick={arrowHandlerLeft} />
          <ImgButton type="right-arrow" onClick={arrowHandlerRight} />
          <ImgButton type="edit" onClick={dataMenuHandler} />
        </div>

        <DataPick />
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
        <p className={classes.message}>{message}</p>

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
