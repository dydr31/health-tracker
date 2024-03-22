import { useContext, useState } from "react";
import { ImgButton } from "../UI/ImgButton";
import { Modal } from "../UI/Modal";
import classes from "./DataMenu.module.scss";
import { DateDisplay } from "./DateDisplay";
import { DataMenuItem } from "./DataMenuItem";
import { DataContext } from "../../store/data-context";

export const DataMenu: React.FC<{
  data: { date: string; upper: number; lower: number; pulse: number }[];
}> = (props) => {


  const deleteHandler = () => {};


  const [showButton, setShowbutton] = useState(false)
  const showDeleteButton = () => {
    setShowbutton(!showButton)
  }

  return (
    <>
      <div className={classes["container"]}>
        <ul>
          <li className={classes.labels}>
            <p>date</p>
            <p>upper</p>
            <p>lower</p>
            <p>pulse</p>
          </li>

          {props.data.map((item) => (
            <DataMenuItem date={item.date} upper={item.upper} lower={item.lower} pulse={item.pulse} key={Math.random()}/>
          ))}
        </ul>
      </div>
    </>
  );
};
