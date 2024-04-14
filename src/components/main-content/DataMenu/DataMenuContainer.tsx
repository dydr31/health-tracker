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
  const { morningItems, eveningItems, shownItems } = useContext(DataContext);
  const { isChart, isSplit } = useContext(FormsStateContext);

  return (
    <>
      <AnimatePresence key='table'>
        {!isChart && isSplit && (
          <div className={classes["data-menu-container"]} key='split'>
            <DropdownWrapper className={classes.undefined} key='t1'>
              <h3>Morning Data:</h3>
              <DataMenu data={morningItems} key='table1'/>
            </DropdownWrapper>
            <DropdownWrapper className={classes.undefined} key='t2'>
              <h3>Evening Data:</h3>
              <DataMenu data={eveningItems} key='table2'/>
            </DropdownWrapper>
          </div>
        )}
        {!isChart && !isSplit && (
          <div key='merged'>
            <DropdownWrapper className={classes.undefined} key='t3'>
              <DataMenu data={shownItems} key='table3'/>
            </DropdownWrapper>
          </div>
        )}
        <ChartLegend />
      </AnimatePresence>
    </>
  );
};
