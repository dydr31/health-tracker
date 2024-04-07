import { AnimatePresence, useScroll} from "framer-motion";

import { Modal } from "../../UI/Modal";
import { ImgButton } from "../../UI/ImgButton";
import { useContext, useState } from "react";
import { FormsStateContext } from "../../../store/forms-state-context";
import { DataMenu } from "./DataMenu";

import classes from "./DataMenuContainer.module.scss";
import { DataContext } from "../../../store/data-context";
import { OpacityChangingWrapper } from "../../UI/OpacityChangingWrapper";

import { filterForDayAndEvening } from "../Chart/ChartParentContainer";

export const DataMenuContainer = () => {
  const formsStateCtx = useContext(FormsStateContext);
  const {shownItems}= useContext(DataContext);

  let data = shownItems

  const {type} = useContext(FormsStateContext)

  let daily = filterForDayAndEvening(shownItems).daily;
  let evening = filterForDayAndEvening(shownItems).evening;

  if (type === true){
    data = daily
  }
  else {
    data = evening
  }



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
            <DataMenu data={data} />
          </OpacityChangingWrapper>
        </>
      )}
    </AnimatePresence>
  );
};
