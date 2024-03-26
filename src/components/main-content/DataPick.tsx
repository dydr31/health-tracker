import { DatesContext } from "../../store/date-context";
import { Button } from "../UI/Button";
import { ImgButton } from "../UI/ImgButton";
import classes from "./DataPick.module.scss";
import { useContext, useRef, useState } from "react";
import { SmallButton } from "../UI/SmallButton";
import { Modal } from "../UI/Modal";
import { AnimatePresence, motion } from "framer-motion";

export const DataPick: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  let fromRef = useRef<HTMLInputElement>(null);
  let toRef = useRef<HTMLInputElement>(null);

  let datesCtx = useContext(DatesContext);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    let currentFrom = fromRef.current!.value;
    let currentTo = toRef.current!.value;

    datesCtx.addDateFrom(currentFrom!);

    datesCtx.addDateTo(currentTo!);
  };

  const showFormHandler = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <AnimatePresence>
        {isFormOpen && (
          <>
            <Modal />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ bounce: 0, duration: 0.5 }}
              className={classes["form-container"]}
            >
              <ImgButton type={"close"} onClick={showFormHandler} />

              <form className={classes.form} onSubmit={submitForm}>
                <div className={classes["form-content"]}>
                  <label>from:</label>
                  <input
                    type="date"
                    ref={fromRef}
                    className={classes.input}
                    required
                  />
                  <label>to:</label>
                  <input
                    type="date"
                    ref={toRef}
                    className={classes.input}
                    required
                  />
                </div>

                <Button text="apply" onClick={submitForm} />
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {<SmallButton text={"filter by date"} onClick={showFormHandler} />}
    </>
  );
};
