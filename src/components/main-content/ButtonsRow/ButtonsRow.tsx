import classes from "./ButtonsRow.module.scss";
import { ImgButton } from "../../UI/ImgButton";
import { SmallButton } from "../../UI/SmallButton";
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

  let length = dataCtx.items.length;
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
        <ImgButton type="left-arrow" onClick={arrowHandlerLeft} />
      )}
      {clicks < -1 && (
        <ImgButton type="right-arrow" onClick={arrowHandlerRight} />
      )}
      <ImgButton type="menu" onClick={dataMenuHandler} />
      <SmallButton
        text={"filter by date"}
        onClick={() => formsStateCtx.toggleDataPick()}
      />

      <div className={classes["dont-show-on-mobile"]}>
        <SmallButton onClick={showMoreElementsHandler} text={"show more"} />
      </div>
    </div>
  );
};
