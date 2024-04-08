import { useContext, useState } from "react";
import { Button } from "../../UI/Button";
import { SmallButton } from "../../UI/SmallButton";
import classes from "./ButtonsDayOrEvening.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";
import { ImgButton } from "../../UI/ImgButton";
import { TransparentButton } from "../../UI/TransparentButton";
import { motion, AnimatePresence } from "framer-motion";

export const ButtonsLeftSide: React.FC = () => {
  const { type, toggleType } = useContext(FormsStateContext);

  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes["day-or-evening"]}>
      <TransparentButton type="question" onClick={onClickHandler} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ bounce: 0, duration: 0.25 }}
            className={classes.menu}
          >
            chart legend: 
            <ul>
            <li> <b className={classes.pink}>pink</b> for upper</li>
              <li><b className={classes.blue}>blue</b> for lower</li>
              <li><b className={classes.red}>red</b> for pulse</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <SmallButton text="morning" onClick={() => toggleType(true)} active={type} />
      <SmallButton
        text="evening"
        onClick={() => toggleType(false)}
        active={!type}
      /> */}
    </div>
  );
};
