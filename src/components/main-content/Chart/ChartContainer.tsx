import { useContext, useEffect, useState } from "react";
import { LineChart } from "./Chart";
import classes from "./ChartContainer.module.scss";
import { DataContext } from "../../../store/data-context";
import { FormsStateContext } from "../../../store/forms-state-context";

const dummyChartData = {
  labels: [""],
  datasets: [
    {
      label: "",
      data: [0],
      backgroundColor: ["rgb(100, 166, 237)"],
      borderColor: ["rgb(100, 166, 237)"],
    },
  ],
};

export const ChartContainer: React.FC<{}> = (props) => {
  const [chartData, setChartData] = useState(dummyChartData);
  const dataCtx = useContext(DataContext);
  const formsStateCtx = useContext(FormsStateContext);

  let number = formsStateCtx.number;
  let shownData = dataCtx.shownItems;

  useEffect(() => {

    let datesData = shownData.map((item) => item.date.toString().slice(18, 28));
    let datesArr = datesData.map((item) => new Date(Number(item) * 1000));
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

  return (
    <div className={classes["chart-container"]}>
      <LineChart data={chartData} />
    </div>
  );
};
