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
  const { morningItems, eveningItems } = useContext(DataContext);
  const { isChart } = useContext(FormsStateContext);

  return (
    <>
    <AnimatePresence>
      {!isChart && (
        <div className={classes["data-menu-container"]}>
          <DropdownWrapper className={classes.undefined}>
            <h3>Morning Data:</h3>
            <DataMenu data={morningItems} />
          </DropdownWrapper>
          <DropdownWrapper className={classes.undefined}>
            <h3>Evening Data:</h3>
            <DataMenu data={eveningItems} />
          </DropdownWrapper>
        </div>
      )}
      <ChartLegend/>
      </AnimatePresence>
    </>
  );
};
