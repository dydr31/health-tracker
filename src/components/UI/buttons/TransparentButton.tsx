import React from "react";
import classes from "./TransparentButton.module.scss";
import close from "../../pics/close.png";
import arrow from '../../pics/down-arrow.png'
import question from '../../pics/question.png'
import asterisc from '../../pics/asterisc.png'

export const TransparentButton: React.FC<{
  onClick: React.MouseEventHandler;
  type: string,
}> = (props) => {
  return (
    <button className={classes["close"]} onClick={props.onClick}>
      {props.type === 'close' && <img src={close} alt="close"/>}
      {/* {props.type === 'mobile-get-back' && <img src={arrow} className={classes['mobile-get-back']}/>} */}
      {props.type==='question' && <img src={question} alt='info'/>}
      {props.type === 'asterisc' &&<img src={asterisc} alt='info'/>}

    </button>
  );
};
