import { ImgButton } from "../../UI/buttons/ImgButton";
import classes from "./CalendarParentContainer.module.scss";
import { useContext, useRef } from "react";
import { Modal } from "../../UI/Modal";
import { AnimatePresence } from "framer-motion";
import { FormsStateContext } from "../../../store/forms-context";
import { OpacityChangingWrapper } from "../../UI/OpacityChangingWrapper";
import { CalendarContainer } from "./CalendarContainer";

export const DataPick: React.FC = () => {
  let { setCalendarHandler, calendar } = useContext(FormsStateContext);

  return (
    <>
      <AnimatePresence>
        {calendar && (
          <>
            <Modal />
            <OpacityChangingWrapper className={classes["form-container"]}>
              <ImgButton
                type={"close"}
                onClick={() => setCalendarHandler()}
                active={false}
                disabled={false}
              />

              <CalendarContainer />
            </OpacityChangingWrapper>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
