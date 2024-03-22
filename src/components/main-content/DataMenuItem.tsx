import classes from "./DataMenuItem.module.scss";
import { ImgButton } from "../UI/ImgButton";
import { DateDisplay } from "./DateDisplay";
import { useCallback, useContext, useState } from "react";
import { updateData } from "../../store/data-functions";
import { DataContext } from "../../store/data-context";

export const DataMenuItem: React.FC<{
   date: string; upper: number; lower: number; pulse: number; 
}> = (props) => {

    const dataCtx = useContext(DataContext)
  const deleteHandler = async () => {
    await dataCtx.removeItem(props.date)
    
    
  };
 
  
  const [showButton, setShowbutton] = useState(false);
  const showDeleteButton = () => {
    setShowbutton(true);
  };
  const removeDeleteButton = () => {
    setShowbutton(false)
  }

  
  return (
    <li onMouseEnter={showDeleteButton} onMouseLeave={removeDeleteButton} className={classes.li}>
      <div className={classes["floating-button"]}>
        {showButton && <ImgButton type={"close"} onClick={deleteHandler} />}
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
