import classes from "./DataMenuItem.module.scss";
import { ImgButton } from "../UI/ImgButton";
import { DateDisplay } from "./DateDisplay";
import { useCallback, useContext, useState } from "react";
import { updateData } from "../../store/data-functions";
import { DataContext } from "../../store/data-context";
import { TransparentButton } from "../UI/TransparentButton";

export const DataMenuItem: React.FC<{
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}> = (props) => {
  const dataCtx = useContext(DataContext);
  const deleteHandler = async () => {
    await dataCtx.removeItem(props.date);
    setTimeout(() => {
        window.location.reload()
    }, 1000)
  };

  const [showButton, setShowbutton] = useState(false);
  const showDeleteButton = () => {
    setShowbutton(true);
  };
  const removeDeleteButton = () => {
    setShowbutton(false);
  };

  return (
    <li
      onMouseEnter={showDeleteButton}
      onMouseLeave={removeDeleteButton}
      className={classes.li}
    >
      <div className={classes["floating-button"]}>
        {showButton && <TransparentButton onClick={deleteHandler} />}
      </div>
      <div>
        <DateDisplay date={props.date} />
        <p>{props.upper}</p>
        <p>{props.lower}</p>
        <p>{props.pulse}</p>
      </div>
    </li>
  );
};
