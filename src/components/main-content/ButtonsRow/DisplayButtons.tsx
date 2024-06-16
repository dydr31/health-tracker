import { SmallButton } from "../../UI/buttons/SmallButton";
import { useContext } from "react";
import classes from "./DisplayButtons.module.scss";
import { FormsStateContext } from "../../../store/forms-context";


export const DisplayButtons: React.FC = () => {
  const { isMorning, setIsMorning } = useContext(FormsStateContext);
  
  
  const toggleButtons = () => {
    setIsMorning(!isMorning)
  }


  return (
    <div className={classes["display-buttons"]}>
      <SmallButton text="morning" active={isMorning} onClick={toggleButtons}/>
      <SmallButton text="evening" active={!isMorning} onClick={toggleButtons}/>
    </div>
  );
};
