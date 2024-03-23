import React from "react";
import classes from "./TransparentButton.module.scss";
import close from "../pics/close.png";

export const TransparentButton: React.FC<{
  onClick: React.MouseEventHandler;
}> = (props) => {
  return (
    <button className={classes["close"]} onClick={props.onClick}>
      <img src={close} alt="close" className={classes.transparent} />
    </button>
  );
};
