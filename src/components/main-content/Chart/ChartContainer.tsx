import { useContext, useEffect, useState } from "react";
import { LineChart } from "./Chart";
import { Date2 } from "../../../types/types";
import classes from "./ChartContainer.module.scss";
import { ShownItemsContext } from "../../../store/shown-items-context";
import { FormsStateContext } from "../../../store/forms-context";
import { ChartLegend } from "./ChartLegend";
import { DropdownWrapper } from "../../UI/DropdownWrapper";
import { Message } from "./Message";

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

  let showChart = false;

  let hasActualData = false;
  let hasEnoughData = false;
  if (data[0]?.upper !== 0 && data[0]?.upper !== undefined) {
    hasActualData = true;
  }
  if (data.length > 2) {
    hasEnoughData = true;
  }

  if (hasActualData && hasEnoughData) {
    showChart = true;
  }

  const { setCalendarHandler } = useContext(FormsStateContext);
  const { isMorning } = useContext(FormsStateContext);
  //its not the loading

  return (
    <>
      <DropdownWrapper className={classes["chart-subcontainer"]}>
        {hasActualData && hasEnoughData && (
          <>
            {" "}
            {isMorning && showChart && <h3>Morning data:</h3>}
            {!isMorning && showChart && <h3>Evening data:</h3>}
            <div className={classes['line-chart']}>
              <LineChart data={chartData} />
            </div>
          </>
        )}
        {!hasActualData && <Message>No data found</Message>}
        {hasActualData && !hasEnoughData && (
          <Message>
            No enough data to display the chart, fill in new measurements using{" "}
            <b
              className={classes["bold-text"]}
              onClick={() => {
                setCalendarHandler();
              }}
            >
              {" "}
              calendar
            </b>
          </Message>
        )}
        {showChart && <ChartLegend />}
      </DropdownWrapper>
    </>
  );
};
