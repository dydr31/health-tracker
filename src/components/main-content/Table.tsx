import { useEffect, useState } from "react";
import classes from "./Table.module.scss";
import { Form } from "./Form";
import { ImgButton } from "../UI/ImgButton";
import { fetchData } from "../../store/data-functions";
import { DateDisplay } from "./DateDisplay";
import { LineChart } from "./Chart";
import { RoundButton } from "../UI/RoundButton";
import { Modal } from "../UI/Modal";
import { DataPick } from "./DataPick";

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
    labels: ["a", "b", "c", "d", "e", "f", "h", "i", "j", "k"],
    datasets: [
      {
        label: "pulse",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        backgroundColor: ["rgb(100, 166, 237)"],
        borderColor: ["rgb(100, 166, 237)"],
      },
    ],
  });

  useEffect(() => {
    const setData = async () => {
      let data = await fetchData("gzl123n@gmail.com", "Гузель Гузель");
      setDataArray(data);
      setShownData(data.slice(-14));
    };
    setData();
  }, []);

  useEffect(() => {
    let pulseArray = shownData.map((item) => Number(item.pulse));
    let upperArray = shownData.map((item) => Number(item.upper));
    let lowerArray = shownData.map((item) => Number(item.lower));
    let datesArray = shownData.map((item) =>
      item.date.toString().slice(18, 28)
    );
    let arr = datesArray.map((item) => new Date(Number(item) * 1000));
    let arr2 = arr.map((item) => item.toString().slice(4, 21));

    setChartData({
      labels: arr2,
      datasets: [
        {
          label: "pulse",
          data: pulseArray,
          backgroundColor: ["rgb(232, 72, 85)"],
          borderColor: ["rgb(232, 72, 85)"],
        },
        {
          label: "upper",
          data: upperArray,
          backgroundColor: ["rgb(239, 188, 213)"],
          borderColor: ["rgb(239, 188, 213)"],
        },
        {
          label: "lower",
          data: lowerArray,
          backgroundColor: ["rgb(100, 166, 237)"],
          borderColor: ["rgb(100, 166, 237)"],
        },
      ],
    });
  }, [shownData]);

  const arrowHandlerRight = () => {
    setShownData(dataArray.slice(-14));
  };
  const arrowHandlerLeft = () => {
    let length = dataArray.length;
    setShownData(dataArray.slice(0, length - 14));
  };

  const menuHandler = () => {};

  const dateFromHandler = (data: void) => {
  }

  return (
    <>
      <h2>Your tonometer measurements:</h2>
      <div className={classes["options"]}>
        <div className={classes.buttons}>
          <ImgButton type="left-arrow" onClick={arrowHandlerLeft} />
          <ImgButton type="right-arrow" onClick={arrowHandlerRight} />
          <ImgButton type="edit" onClick={arrowHandlerLeft} />
        </div>
        <DataPick />
      </div>
      <div className={classes["chart-and-form-container"]}>
        <div className={classes["chart-container"]}>
          <LineChart data={chartData} />
        </div>

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
