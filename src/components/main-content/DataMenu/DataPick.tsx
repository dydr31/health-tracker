import { DatesContext } from "../../../store/date-context";
import { Button } from "../../UI/buttons/Button";
import { ImgButton } from "../../UI/buttons/ImgButton";
import classes from "./DataPick.module.scss";
import { useContext, useRef } from "react";
import { Modal } from "../../UI/Modal";
import { AnimatePresence } from "framer-motion";
import { FormsStateContext } from "../../../store/forms-state-context";
import { OpacityChangingWrapper } from "../../UI/OpacityChangingWrapper";
import { CalendarContainer } from "./CalendarContainer";
import { DayMenu } from "../DayMenu/DayMenu";

export const DataPick: React.FC = () => {
  let { toggleDataPick, dataPick, dayMenu } = useContext(FormsStateContext);

  return (
    <>
      {/* {console.log(datesCtx)} */}
      <AnimatePresence>
        {dataPick && (
          <>
            <Modal />
            <OpacityChangingWrapper className={classes["form-container"]}>
              <ImgButton
                type={"close"}
                onClick={() => toggleDataPick()}
                active={false}
              />

              <CalendarContainer />
            </OpacityChangingWrapper>
          </>
        )}
        
      </AnimatePresence>
    </>
  );
};
