import { AnimatePresence, motion } from "framer-motion";

import classes from "./FormContainer.module.scss";

import { Modal } from "../../UI/Modal";
import { ImgButton } from "../../UI/ImgButton";
import { Form } from "./Form";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-state";

export const FormContainer = () => {
    const formsStateCtx = useContext(FormsStateContext)
    const formHandler = () => {
        console.log('a')
        formsStateCtx.toggleForm()
    }
  return (
    <AnimatePresence>
      {
        formsStateCtx.form &&
        <>
          <Modal />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ bounce: 0, duration: 0.5 }}
            className={classes["form-container"]}
          >
            <ImgButton onClick={formHandler} type={"close"} />
            <Form />
          </motion.div>
        </>
      }
    </AnimatePresence>
  );
};
