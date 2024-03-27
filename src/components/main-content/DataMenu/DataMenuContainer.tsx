import { AnimatePresence, motion } from "framer-motion";

import { Modal } from "../../UI/Modal";
import { ImgButton } from "../../UI/ImgButton";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-state";
import { DataMenu } from "./DataMenu";

import classes from "./DataMenuContainer.module.scss";
import { DataContext } from "../../../store/data-context";

export const DataMenuContainer = () => {
  const formsStateCtx = useContext(FormsStateContext);
  const dataCtx = useContext(DataContext)

  const dataMenuHandler = () => {
    formsStateCtx.toggleDataMenu()
  };
  return (
    <AnimatePresence>
      {formsStateCtx.dataMenu && (
        <>
          <Modal />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ bounce: 0, duration: 0.5 }}
            className={classes["data-menu-container"]}
          >
            <ImgButton type={"close"} onClick={dataMenuHandler} />
            <DataMenu data={dataCtx.shownItems} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
