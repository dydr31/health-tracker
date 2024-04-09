import { DatesContext } from "../../../store/date-context";
import { Button } from "../../UI/buttons/Button";
import { ImgButton } from "../../UI/buttons/ImgButton";
import classes from "./DataPick.module.scss";
import { useContext, useRef} from "react";
import { Modal } from "../../UI/Modal";
import { AnimatePresence} from "framer-motion";
import { FormsStateContext } from "../../../store/forms-state-context";
import { OpacityChangingWrapper } from "../../UI/OpacityChangingWrapper";

export const DataPick: React.FC = () => {

  let fromRef = useRef<HTMLInputElement>(null);
  let toRef = useRef<HTMLInputElement>(null);

  let datesCtx = useContext(DatesContext);
  let formsStateCtx = useContext(FormsStateContext);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    let currentFrom = fromRef.current!.value;
    let currentTo = toRef.current!.value;

    datesCtx.addDateFrom(currentFrom!);
    datesCtx.addDateTo(currentTo!);
  };

  return (
    <>
    {/* {console.log(datesCtx)} */}
      <AnimatePresence>
        {formsStateCtx.dataPick && (
          <>
            <Modal />
            <OpacityChangingWrapper className={classes["form-container"]}>
              <ImgButton
                type={"close"}
                onClick={() => formsStateCtx.toggleDataPick()}
                active={false}
              />

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
            </OpacityChangingWrapper>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
