import classes from "./DataMenu.module.scss";
import { DataMenuItem } from "./DataMenuItem";
import { List } from "../../../types/types";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-state-context";

export const DataMenu: React.FC<{ data: List }> = (props) => {
  let isEmpty = false;
  if (props.data.length === 0) {
    isEmpty = true;
  }
  const { isSplit } = useContext(FormsStateContext);
  return (
    <>
      <div
        className={`${
          isSplit ? classes["container"] : classes["container_big"]
        }`}
      >
        <ul>
          {/* <li className={classes.labels}>
            <p>date</p>
            <p>upper</p>
            <p>lower</p>
            <p>pulse</p>
          </li> */}

          {!isEmpty &&
            props.data.map((item) => (
              <DataMenuItem
                date={item.date}
                upper={item.upper}
                lower={item.lower}
                pulse={item.pulse}
                key={Math.random()}
              />
            )
            )}
        </ul>
        {isEmpty && (
          <div className={classes.message}>
            <p>You don't have data for this time period</p>
          </div>
        )}
      </div>
    </>
  );
};
