import { AnimatePresence, motion } from "framer-motion";

import { Modal } from "../../UI/Modal";
import { ImgButton } from "../../UI/buttons/ImgButton";
import { useContext, useState } from "react";
import { FormsStateContext } from "../../../store/forms-state-context";
import { DataMenu } from "./DataMenu";

import classes from "./DataMenuContainer.module.scss";
import { DataContext } from "../../../store/data-context";
import { DropdownWrapper } from "../../UI/DropdownWrapper";
import { ChartLegend } from "../ButtonsRow/ChartLegend";

export const DataMenuContainer = () => {
  const { shownItems, eveningItems, morningItems} = useContext(DataContext);
  const { isChart} = useContext(FormsStateContext);

  return (
    <>
      <AnimatePresence key="table">
        {!isChart && (
          <div className={classes["data-menu-container"]}>
            <DropdownWrapper className={classes.undefined} key="t1">
              <h3>Morning Data:</h3>
              <DataMenu data={morningItems} key="table1" />
            </DropdownWrapper>
            <DropdownWrapper className={classes.undefined} key="t2">
              <h3>Evening Data:</h3>
              <DataMenu data={eveningItems} key="table2" />
            </DropdownWrapper>
          </div>
        )}
        <ChartLegend />
      </AnimatePresence>
    </>
  );
};
