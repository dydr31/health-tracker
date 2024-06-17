import { useEffect, useState } from "react";
import { LineChart } from "./Chart";
import { Date2 } from "../../../types/types";

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
  date: Date2;
  upper: number;
  lower: number;
  pulse: number;
};

export const ChartContainer: React.FC<{ data: ItemObj2[] }> = (props) => {
  const [chartData, setChartData] = useState(dummyChartData);
  let data = props.data;
  let datesArr = data.map((item) => new Date(Number(item.date.seconds) * 1000));
  let datesArrStrings = datesArr.map((item) => item.toString().slice(4, 10));

  useEffect(() => {
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
  }, [data]);

  return (
    <>
      <LineChart data={chartData} />
    </>
  );
};
