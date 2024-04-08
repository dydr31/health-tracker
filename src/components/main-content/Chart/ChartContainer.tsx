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

type ItemObj2 = {
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}

export const ChartContainer: React.FC<{data: ItemObj2[]}> = (props) => {
  const [chartData, setChartData] = useState(dummyChartData);
  const {number} = useContext(FormsStateContext);

  let data = props.data

  useEffect(() => {

    let datesData = data.map((item) => item.date.toString().slice(18, 28));
    let datesArr = datesData.map((item) => new Date(Number(item) * 1000));
    let datesArrStrings = datesArr.map((item) => item.toString().slice(4, 10));

    
    setChartData({
      labels: datesArrStrings,
      datasets: [
        {
          label: "pulse",
          data: data.map((item) => Number(item.pulse)),
          backgroundColor: ["rgb(232, 72, 85)"],
          borderColor: ["rgb(232, 72, 85)"],
        },
        {
          label: "upper",
          data: data.map((item) => Number(item.upper)),
          backgroundColor: ["rgb(239, 188, 213)"],
          borderColor: ["rgb(239, 188, 213)"],
        },
        {
          label: "lower",
          data: data.map((item) => Number(item.lower)),
          backgroundColor: ["rgb(100, 166, 237)"],
          borderColor: ["rgb(100, 166, 237)"],
        },
      ],
    });
  }, [data, number]);

  return (
    <>
      <LineChart data={chartData} />
    </>
  );
};
