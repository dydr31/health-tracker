import { SmallButton } from "../../UI/buttons/SmallButton";
import { useContext } from "react";
import classes from "./TimeOfDayButtons.module.scss";
import { FormsStateContext } from "../../../store/forms-context";
import { ShownItemsContext } from "../../../store/shown-items-context";


export const TimeOfDayButtons: React.FC = () => {
  const { isMorning, setIsMorning } = useContext(FormsStateContext);
  const {setClicks, setMaxClicks} = useContext(ShownItemsContext)
  
  const toggleButtons = () => {
    setIsMorning(!isMorning)
    setClicks(0)
    setMaxClicks(1000)
  }

  return (
    <div className={classes["display-buttons"]}>
      <SmallButton text="morning" active={isMorning} onClick={toggleButtons}/>
      <SmallButton text="evening" active={!isMorning} onClick={toggleButtons}/>
    </div>
  );
};
