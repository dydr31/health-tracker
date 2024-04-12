import { useContext, useState } from "react";
import { Button } from "../../UI/buttons/Button";
import { SmallButton } from "../../UI/buttons/SmallButton";
import classes from "./ChartLegend.module.scss";
import { FormsStateContext } from "../../../store/forms-state-context";
import { ImgButton } from "../../UI/buttons/ImgButton";
import { TransparentButton } from "../../UI/buttons/TransparentButton";
import { motion, AnimatePresence } from "framer-motion";
import question from '../../pics/question.png'

export const ChartLegend: React.FC = () => {
  const { isChart: isChart, toggleChart} = useContext(FormsStateContext);

  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.content}>
      <img src={question} onClick={onClickHandler}/>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ bounce: 0, duration: 0.25 }}
            className={classes.menu}
          >
            <p>
              <b className={classes.pink}>pink</b> for systolic
              blood pressure, <b className={classes.blue}>blue</b> for diastolic
              blood pressure, <b className={classes.red}>red</b> for pulse
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
