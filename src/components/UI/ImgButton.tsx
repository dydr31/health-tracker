import React from "react";
import classes from "./ImgButton.module.scss";
import close from "../pics/close.png";
import arrow from "../pics/down-arrow.png";
import pencil from "../pics/pencil.png";
import menu from "../pics/menu.png";
import filter from '../pics/filter.png'

export const ImgButton: React.FC<{
  onClick: React.MouseEventHandler;
  type: string;
}> = (props) => {
  return (
    <button onClick={props.onClick} className={classes.close}>
      {props.type === "close" && <img src={close} alt="close" />}
      {props.type === "close-transparent" && (
        <img src={close} alt="close" className={classes.transparent} />
      )}
      {props.type === "right-arrow" && (
        <img src={arrow} alt="right arrow" className={classes["right-arrow"]} />
      )}
      {props.type === "left-arrow" && (
        <img src={arrow} alt="left arrow" className={classes["left-arrow"]} />
      )}
      {props.type === "add new" && <img src={pencil} alt="add new" />}
      {props.type === "menu" && <img src={menu} alt="menu" />}
      {props.type === 'filter' && <img src={filter} alt='filter' />}
    </button>
  );
};
