import React from "react";
import classes from './DateDisplay.module.css'

export const DateDisplay: React.FC<{ date: string }> = (props) => {
  let timestamp = props.date.toString();
  let nanoseconds = Number(timestamp.slice(-10));
  let seconds = Number(timestamp.slice(18, 28));
  let date = new Date(seconds * 1000);

  return (
    <p className={classes['date']}>{date.toString().slice(4, 10) + ", "} <br/>{date.toString().slice(16, 21)} </p>
    
  );
};
