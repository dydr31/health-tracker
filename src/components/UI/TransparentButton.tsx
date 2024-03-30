import React from "react";
import classes from "./TransparentButton.module.scss";
import close from "../pics/close.png";
import arrow from '../pics/down-arrow.png'

export const TransparentButton: React.FC<{
  onClick: React.MouseEventHandler;
  type: string,
}> = (props) => {
  return (
    <button className={classes["close"]} onClick={props.onClick}>
      {props.type === 'close' && <img src={close} alt="close" className={classes.transparent} />}
      {props.type === 'mobile-get-back' && <img src={arrow} className={classes['mobile-get-back']}/>}
    </button>
  );
};
