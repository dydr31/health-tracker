import { useContext, useEffect, useState } from "react";
import { LineChart } from "./Chart";
import { ShownItemsContext } from "../../../store/shown-items-context";
import classes from "./ChartContainer.module.scss";
import { DataContext } from "../../../store/data-context";
import { FormsStateContext } from "../../../store/forms-context";
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
  }, [
    data,
    //number
  ]);

  const { n, clicks, setMaxClicks, maxClicks } = useContext(ShownItemsContext);
  const [slicedItems, setSlicedItems] = useState(data);

  useEffect(() => {
    if (clicks > 0) {
      let range = [-(clicks + 1) * n, -clicks * n];
      setSlicedItems(data.slice(range[0], range[1]));
      console.log(data.slice(range[0], range[1]));
    }
    if (clicks < 0) {
      console.log("its future");
    }
    if (clicks === 0) {
      setSlicedItems(data.slice(-n));
      console.log("default week");
    }
  }, [data, clicks]);

  return (
    <>
      <LineChart data={chartData} />
    </>
  );
};
