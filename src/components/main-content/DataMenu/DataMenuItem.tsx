import classes from "./DataMenuItem.module.scss";
import { DateDisplay } from "./DateDisplay";
import { useContext, useState } from "react";
import { DataContext } from "../../../store/data-context";
import { TransparentButton } from "../../UI/TransparentButton";
import { LogInContext } from "../../../store/login-context";

export const DataMenuItem: React.FC<{
  date: string;
  upper: number;
  lower: number;
  pulse: number;
}> = (props) => {
  const dataCtx = useContext(DataContext);
  const logInCtx = useContext(LogInContext)
  const deleteHandler = async () => {
    await dataCtx.removeItem(props.date, logInCtx.Email);
    setTimeout(() => {
        window.location.reload()
    }, 500)
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
      <div className={classes.content}>
        <DateDisplay date={props.date} />
        <p className={`${classes.upper} ${classes.number}`}>{props.upper}</p>
        <p className={`${classes.lower} ${classes.number}`}>{props.lower}</p>
        <p className={`${classes.pulse} ${classes.number}`}>{props.pulse}</p>
      </div>
    </li>
  );
};
