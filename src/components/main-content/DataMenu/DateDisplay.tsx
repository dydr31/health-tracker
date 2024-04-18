import React from "react";
import classes from './DateDisplay.module.scss'
import { Date2 } from "../../../types/types";

export const DateDisplay: React.FC<{ date: Date2}> = (props) => {
  let timestamp = props.date.toString();
  let nanoseconds = Number(timestamp.slice(-10));
  let seconds = Number(timestamp.slice(18, 28));
  let date = new Date(seconds * 1000);

  return (
    <p className={classes['date']}>{date.toString().slice(4, 10) + ", "} <br/>{date.toString().slice(16, 21)} </p>
  );
};
