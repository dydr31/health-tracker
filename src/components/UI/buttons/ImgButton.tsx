import React from "react";
import classes from "./ImgButton.module.scss";
import close from "../../pics/close.png";
import arrow from "../../pics/down-arrow.png";
import pencil from "../../pics/pencil.png";
import menu from "../../pics/menu.png";
import filterImg from '../../pics/filter.png'
import question from '../../pics/question.png'
import chart from '../../pics/chart.png'
import table from '../../pics/cells.png'

const Close = {src: close, alt: 'close'}
const Arrow = {src: arrow, alt: 'arrow'}
const AddNew = {src: pencil, alt: 'add new'}
const Menu = {src: menu, alt: 'menu'}
const Filter =  {src: filterImg, alt: 'filter'}
const Question = {src: question, alt: 'info'}
const Chart = {src: chart, alt: 'chart'}
const Table = {src: table, alt: 'table'}

export const ImgButton: React.FC<{
  onClick: React.MouseEventHandler;
  type: string; active: boolean;
}> = (props) => {

  // let Placeholder = Close
  // switch (props.type){
  //   case'close':{
  //     Placeholder = Close
  //     return
  //   }
  //   case 'right-arrow':{
  //     Placeholder = Arrow
  //     return
  //   }
  // }

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
      {props.type === 'filter' && <img src={filterImg} alt='filter' />}
      {props.type === 'question' && <img src={question} alt='info' />}
      {props.type === 'chart' && <img src={chart} alt='chart' className={`${props.active ? classes.active : undefined}`}/>}
      {props.type === 'table' && <img src={table} alt='table' className={`${props.active ? classes.active : undefined}`}/>}
    </button>
  );
};
