import classes from "./DataMenu.module.scss";
import { ItemObj } from "../../../types/types";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-state-context";
import { DataMenuItem } from "./DataMenuItem";


export const DataMenu: React.FC<{ data: ItemObj[] }> = (props) => {
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
          {!isEmpty &&
            props.data.map((item) => (
              <DataMenuItem
                date={item.date}
                upper={item.upper}
                lower={item.lower}
                pulse={item.pulse}
                modified={item.modified}
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
