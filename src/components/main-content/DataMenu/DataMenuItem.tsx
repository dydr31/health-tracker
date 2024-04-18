import { Date2 } from "../../../types/types";
import classes from "./DataMenuItem.module.scss";
import { DateDisplay } from "./DateDisplay";
import { TransparentButton } from "../../UI/buttons/TransparentButton";
import { useContext, useState } from "react";
import { DataContext } from "../../../store/data-context";
import { LogInContext } from "../../../store/login-context";

export const DataMenuItem: React.FC<{
  date: Date2;
  upper: number;
  lower: number;
  pulse: number;
  modified: boolean;
}> = (props) => {
  const dataCtx = useContext(DataContext);
  const { Email } = useContext(LogInContext);

  const deleteHandler = async () => {
    await dataCtx.removeItem(props.date, Email);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const [showButton, setShowbutton] = useState(false);
  const showDeleteButton = () => {
    setShowbutton(true);
  };
  const removeDeleteButton = () => {
    setShowbutton(false);
  };

  return (
    <>
      <div
        onMouseEnter={showDeleteButton}
        onMouseLeave={removeDeleteButton}
        className={classes.li}
      >
        <div className={classes["floating-button"]}>
        {showButton && !props.modified &&(
          <TransparentButton type="close" onClick={deleteHandler} />
        )}
        </div>
        <div className={classes.content}>
          <DateDisplay date={props.date} />
          <p className={`${classes.upper} ${classes.number}`}>{props.upper}</p>
          <p className={`${classes.lower} ${classes.number}`}>{props.lower}</p>
          <p className={`${classes.pulse} ${classes.number}`}>{props.pulse}</p>
        </div>
      </div>
    </>
  );
};
