import React from "react";
import classes from "./ImgButton.module.scss";
import close from "../../pics/close.png";
import arrow from "../../pics/down-arrow.png";
import pencil from "../../pics/pencil.png";
import menu from "../../pics/menu.png";
import filterImg from "../../pics/filter.png";
import question from "../../pics/question.png";
import chart from "../../pics/chart.png";
import table from "../../pics/cells.png";
import plus from "../../pics/plus.png";
import asterisc from "../../pics/asterisc.png";
import calendar from "../../pics/calendar.png";

const Close = { src: close, alt: "close", className: "" };
const RightArrow = {
  src: arrow,
  alt: "arrow pointing right",
  className: "right-arrow",
};
const RightArrowDisabled = {
  src: arrow,
  alt: "arrow pointing right",
  className: "right-arrow",
};
const LeftArrow = {
  src: arrow,
  alt: "arrow pointing left",
  className: "left-arrow",
};
const Edit = { src: pencil, alt: "add new", className: "" };
const Menu = { src: menu, alt: "menu", className: "" };
const Filter = { src: filterImg, alt: "filter", className: "" };
const Question = { src: question, alt: "info", className: "" };
const Plus = { src: plus, alt: "add new", className: "" };
const Chart = { src: chart, alt: "chart", className: "" };
const Table = { src: table, alt: "table", className: "" };
const Asterics = { src: asterisc, alt: "info", className: "" };
const Calendar = { src: calendar, alt: "calendar", className: "" };

export const ImgButton: React.FC<{
  onClick: React.MouseEventHandler;
  type: string;
  active: boolean;
  disabled: boolean;
}> = (props) => {
  let Placeholder = Close;

  if (props.type === "right-arrow") {
    Placeholder = RightArrow;
  }
  if (props.type === "right-arrow-disabled") {
    Placeholder = RightArrow;
  }
  if (props.type === "left-arrow") {
    Placeholder = LeftArrow;
  }
  if (props.type === "edit") {
    Placeholder = Edit;
  }
  if (props.type === "menu") {
    Placeholder = Menu;
  }
  if (props.type === "filter") {
    Placeholder = Filter;
  }
  if (props.type === "question") {
    Placeholder = Question;
  }
  if (props.type === "plus") {
    Placeholder = Plus;
  }
  if (props.type === "chart") {
    Placeholder = Chart;
  }
  if (props.type === "table") {
    Placeholder = Table;
  }
  if (props.type === "asterisc") {
    Placeholder = Asterics;
  }
  if (props.type === "calendar") {
    Placeholder = Calendar;
  }

  return (
    <button
      onClick={props.onClick}
      className={`${classes.close} ${
        props.active ? classes.active : undefined
      } ${props.disabled ? classes.inactive : undefined}`}
    >
      <img
        src={Placeholder.src}
        alt={Placeholder.alt}
        className={`${classes[Placeholder.className]}`}
      />
    </button>
  );
};
