import { useContext, useEffect, useState } from "react";
import classes from "./FixedDateFormContainer.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";
import { AnimatePresence } from "framer-motion";
import { ImgButton } from "../../UI/buttons/ImgButton";
import { Modal } from "../../UI/Modal";
import { OpacityChangingWrapper } from "../../UI/OpacityChangingWrapper";
import { FixedDateForm } from "./FixedDateForm";
import { SmallButton } from "../../UI/buttons/SmallButton";
import { DayDataContext } from "../../../store/day-data-context";

export const FixedDateFormContainer: React.FC = () => {
  const { fixedDateMenu, setFixedDateMenu } = useContext(FormsStateContext);
  const {morningData, eveningData, setMorningDataHandler, setEveningDataHandler} = useContext(DayDataContext)
  const [isMorning, setIsMorning] = useState(true)
  const [data, setData] = useState(morningData)

  const switchToMorning = () => {
    setIsMorning(true)
    setData(morningData)
  }

  const switchToEvening = () => {
    setIsMorning(false)
    setData(eveningData)
  }

  useEffect(() => {
    setData(morningData)
  }, [fixedDateMenu, morningData])
  return (
    <>
  
      <AnimatePresence>
        {fixedDateMenu && (
          <>
            <Modal />
            <OpacityChangingWrapper className={classes["form-container"]}>
              <div className={classes["buttons-container"]}>
                <div>
                  <SmallButton
                    text="morning"
                    active={isMorning}
                    onClick={switchToMorning}
                  />
                  <SmallButton
                    text="evening"
                    active={!isMorning}
                    onClick={switchToEvening}
                  />
                </div>

                <ImgButton
                  onClick={() => {
                    setFixedDateMenu(false);
                    setMorningDataHandler({upper: 0, lower: 0, pulse: 0, date: {seconds: 0}})
                    setEveningDataHandler({upper: 0, lower: 0, pulse: 0, date: {seconds: 0}})
                    setIsMorning(true)
                    
                  }}
                  type={"close"}
                  active={false}
                />
              </div>

              <FixedDateForm data={data} isMorning={isMorning}/>
            </OpacityChangingWrapper>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
