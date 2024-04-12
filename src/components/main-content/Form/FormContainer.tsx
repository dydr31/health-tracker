import { AnimatePresence} from "framer-motion";

import classes from "./FormContainer.module.scss";

import { Modal } from "../../UI/Modal";
import { ImgButton } from "../../UI/buttons/ImgButton";
import { Form } from "./Form";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-state-context";
import { OpacityChangingWrapper } from "../../UI/OpacityChangingWrapper";

export const FormContainer = () => {
  const formsStateCtx = useContext(FormsStateContext);
  const formHandler = () => {
    formsStateCtx.toggleForm();
  };
  return (
    <>
    <AnimatePresence>
      {formsStateCtx.form && (
        <>
        
          <Modal />
          <OpacityChangingWrapper className={classes["form-container"]}>
            <ImgButton onClick={formHandler} type={"close"} active={false}/>
            <Form />
          </OpacityChangingWrapper>
        </>
      )}
      </AnimatePresence>
    </>
  );
};
