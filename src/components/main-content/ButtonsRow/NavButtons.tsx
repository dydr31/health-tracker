import classes from "./NavButtons.module.scss";
import { ImgButton } from "../../UI/buttons/ImgButton";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-context";
import { ShownItemsContext } from "../../../store/shown-items-context";

export const ButtonsRow: React.FC = () => {
  let { setCalendarHandler, setFixedDateMenu } = useContext(FormsStateContext);
  const { clicks, setClicks, maxClicks } = useContext(ShownItemsContext);

  const arrowHandlerLeft = () => {
    setClicks(clicks + 1);
  };

  const arrowHandlerRight = () => {
    setClicks(clicks - 1);
  };

  return (
    <>{console.log(maxClicks, clicks)}
      <div className={classes.buttons}>
        {clicks < maxClicks && (
          <ImgButton
            type="left-arrow"
            onClick={arrowHandlerLeft}
            active={false}
            key="left-arrow"
          />
        )}

        {clicks >= 1 && (
          <ImgButton
            type="right-arrow"
            onClick={arrowHandlerRight}
            active={false}
            key="right-arrow"
          />
        )}

        <ImgButton
          type="calendar"
          onClick={() => setCalendarHandler()}
          active={false}
          key="filter"
        />
        <div className={classes["show-on-mobile"]}>
          <ImgButton
            type="plus"
            onClick={() => setFixedDateMenu(true)}
            active={false}
            key="plus"
          />
        </div>
      </div>
    </>
  );
};
