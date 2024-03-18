import React from "react";
import classes from "./ImgButton.module.scss";
import close from "../pics/close.png";
import arrow from "../pics/down-arrow.png";
import pencil from '../pics/pencil.png'

export const ImgButton: React.FC<{
  onClick: React.MouseEventHandler;
  type: string;
}> = (props) => {
  return (
    <button onClick={props.onClick} className={classes.close}>
      {props.type === "close" && <img src={close} alt="close" />}
      {props.type === "right-arrow" && (
        <img src={arrow} alt="right arrow" className={classes["right-arrow"]} />
      )}
      {props.type === "left-arrow" && (
        <img src={arrow} alt="left arrow" className={classes["left-arrow"]} />
      )}
      {props.type ==='edit' && (
        <img src={pencil} alt='edit'/>
      )}
    </button>
  );
};
