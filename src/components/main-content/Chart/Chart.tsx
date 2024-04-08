import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import classes from "./Chart.module.scss";

export const LineChart: React.FC<{
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
    }[];
  };
}> = (props) => {
  Chart.register(CategoryScale);
  return (
    <>
      {" "}
      <Line data={props.data} />
    </>
  );
};
