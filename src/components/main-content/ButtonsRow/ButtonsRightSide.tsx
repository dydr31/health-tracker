import classes from "./ButtonsRightSide.module.scss";
import { ImgButton } from "../../UI/buttons/ImgButton";
import { SmallButton } from "../../UI/buttons/SmallButton";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-state-context";
import { LogInContext } from "../../../store/login-context";
import { DataContext } from "../../../store/data-context";

export const ButtonsRow: React.FC = () => {
  let formsStateCtx = useContext(FormsStateContext);
  let logInCtx = useContext(LogInContext);
  let dataCtx = useContext(DataContext);

  let number = formsStateCtx.number;
  let clicks = formsStateCtx.clicks;

  let length = 2
  // dataCtx.groupedItems.length;
  let maxClicks = length / number;

  const arrowHandlerLeft = () => {
    formsStateCtx.minusClick();
  };

  const arrowHandlerRight = () => {
    formsStateCtx.plusClick();
  };

  const dataMenuHandler = () => {
    let email = logInCtx.Email;
    dataCtx.loadItems(email);
    formsStateCtx.toggleDataMenu();
  };

  const showMoreElementsHandler = () => {
    formsStateCtx.setNumber();
    // setNumber(number + 1);
  };

  return (
    <div className={classes.buttons}>
      {-1 * clicks < maxClicks && (
        <ImgButton type="left-arrow" onClick={arrowHandlerLeft} active={false} key='left-arrow'/>
      )}
      {clicks < -1 && (
        <ImgButton type="right-arrow" onClick={arrowHandlerRight} active={false} key='right-arrow'/>
      )}
      <ImgButton type="filter" onClick={() => formsStateCtx.toggleDataPick()} active={false} key='filter'/>
      <div className={classes["show-on-mobile"]}>
        <ImgButton type="plus" onClick={() => formsStateCtx.toggleForm()} active={false} key='plus'/>
      </div>

      <div className={classes["dont-show-on-mobile"]}>
        <SmallButton onClick={showMoreElementsHandler} text={"show more"} active={false} />
      </div>
    </div>
  );
};
