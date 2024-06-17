import classes from "./NavButtons.module.scss";
import { ImgButton } from "../../UI/buttons/ImgButton";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-context";
import { ShownItemsContext } from "../../../store/shown-items-context";

export const ButtonsRow: React.FC = () => {
  let { setCalendarHandler, setFixedDateMenu } = useContext(FormsStateContext);
  const { clicks, setClicks, maxClicks } = useContext(ShownItemsContext);

  const arrowHandlerLeft = () => {
    if (clicks < maxClicks) {
      setClicks(clicks + 1);
    }
  };

  const arrowHandlerRight = () => {
    if (clicks >= 1) {
      setClicks(clicks - 1);
    }
  };

  return (
    <>

      <div className={classes.buttons}>
        <ImgButton
          type="left-arrow"
          onClick={arrowHandlerLeft}
          active={false}
          disabled={clicks < maxClicks ? false : true}
          key="left-arrow"
        />

        <ImgButton
          type="right-arrow"
          onClick={arrowHandlerRight}
          active={false}
          disabled={clicks >= 1 ? false : true}
          key="right-arrow"
        />

        <ImgButton
          type="calendar"
          onClick={() => setCalendarHandler()}
          active={false}
          disabled={false}
          key="filter"
        />
        <div className={classes["show-on-mobile"]}>
          <ImgButton
            type="plus"
            onClick={() => setFixedDateMenu(true)}
            active={false}
            disabled={false}
            key="plus"
          />
        </div>
      </div>
    </>
  );
};
