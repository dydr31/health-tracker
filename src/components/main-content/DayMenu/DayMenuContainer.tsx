import { AnimatePresence } from "framer-motion";
import classes from "./DayMenuContainer.module.scss";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-state-context";
import { Modal } from "../../UI/Modal";
import { DayMenu } from "./DayMenu";
import { OpacityChangingWrapper } from "../../UI/OpacityChangingWrapper";
import { ImgButton } from "../../UI/buttons/ImgButton";

export const DayMenuContainer: React.FC = () => {
  const { dayMenu } = useContext(FormsStateContext);
  return (
    <>
      <AnimatePresence>
        {dayMenu && (
          <>
            <Modal />
            <OpacityChangingWrapper className={classes['form-container']}>
              <ImgButton type="close" onClick={() => {}} active={false} />
              <DayMenu />
            </OpacityChangingWrapper>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
