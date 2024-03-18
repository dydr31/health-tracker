import { useEffect, useState } from "react";
import classes from "./Table.module.scss";
import { Form } from "./Form";
import { ImgButton } from "../UI/ImgButton";
import { fetchData } from "../../store/data-functions";
import { DateDisplay } from "./DateDisplay";
import { LineChart } from "./Chart";

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
    //  datesArray
    datasets: [
      {
        label: "pulse",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    ],
  });

  useEffect(() => {
    const setData = async () => {
      let data = await fetchData("gzl123n@gmail.com", "Гузель Гузель");
      setDataArray(data);
      setShownData(data);
    };
    setData();
  }, []);

  useEffect(() => {
    let pulseArray = shownData.map((item) => Number(item.pulse));
    let upperArray = shownData.map((item) => Number(item.upper));
    let lowerArray= shownData.map((item) => Number(item.lower))
    let datesArray = shownData.map((item) =>
      item.date.toString().slice(18, 28)
    );
    console.log(datesArray)
    let arr = datesArray.map(item => new Date(Number(item)*1000))
    let arr2 = arr.map(item => item.toString().slice(4,21))
    console.log(arr2)
    setChartData({
      labels: arr2,
      datasets: [
        {
          label: "pulse",
          data: pulseArray,
        },
        {
          label: 'upper',
          data: upperArray,
        },
        {
          label: 'lower',
          data: lowerArray,
        }
      ],
    });
  }, [shownData]);

  const arrowHandlerRight = () => {
    setShownData(dataArray.slice(-10));
  };
  const arrowHandlerLeft = () => {
    let length = dataArray.length;
    setShownData(dataArray.slice(0, length - 10));
  };

  const refreshComponentHandler = () => {};
  return (
    <>
      <h2>Your tonometer measurements:</h2>
      <LineChart data={chartData} />

      {/* <div className={classes.content}>
        <div className={classes.table}>
          <div className={classes["arrow-buttons-container"]}>
            <ImgButton type={"left-arrow"} onClick={arrowHandlerLeft} />
            <ImgButton type={"right-arrow"} onClick={arrowHandlerRight} />
          </div>

          <ul className={classes.ul}>
            <li className={classes.labels}>
              <p className={classes.date}>date</p>
              <p>upper</p>
              <p>lower</p>
              <p>heartbeat</p>
            </li>
            {shownData.map((item) => (
              <li key={Math.random()} className={classes.element}>
                <DateDisplay date={item.date} />
                <p>{item.upper}</p>
                <p>{item.lower}</p>
                <p>{item.pulse}</p>
              </li>
            ))}
          </ul>
        </div>
        {isFormOpen ? (
          <div className={classes["form-container"]}>
            <ImgButton onClick={formHandler} type={"close"} />
            <Form />
          </div>
        ) : (
          <button onClick={formHandler} className={classes["button-add-new"]}>
            ADD NEW +
          </button>
        )}
      </div> */}
    </>
  );
};
