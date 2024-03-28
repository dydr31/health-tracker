import { AnimatePresence, motion } from "framer-motion";

import { Modal } from "../../UI/Modal";
import { ImgButton } from "../../UI/ImgButton";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-state-context";
import { DataMenu } from "./DataMenu";

import classes from "./DataMenuContainer.module.scss";
import { DataContext } from "../../../store/data-context";
import { OpacityChangingWrapper } from "../../UI/OpacityChangingWrapper";

export const DataMenuContainer = () => {
  const formsStateCtx = useContext(FormsStateContext);
  const dataCtx = useContext(DataContext);

  const dataMenuHandler = () => {
    formsStateCtx.toggleDataMenu();
  };
  return (
    <AnimatePresence>
      {formsStateCtx.dataMenu && (
        <>
          <Modal />
          <OpacityChangingWrapper className={classes["data-menu-container"]}>
            <ImgButton type={"close"} onClick={dataMenuHandler} />
            <DataMenu data={dataCtx.shownItems} />
          </OpacityChangingWrapper>
        </>
      )}
    </AnimatePresence>
  );
};
