import classes from "./DataMenu.module.scss";
import { DataMenuItemContainer } from "./DataMenuItemContainer";
import { ItemObj, List } from "../../../types/types";
import { useContext } from "react";
import { FormsStateContext } from "../../../store/forms-state-context";
import { ModifiedList } from "../Table-functions";

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
          {/* <li className={classes.labels}>
            <p>date</p>
            <p>upper</p>
            <p>lower</p>
            <p>pulse</p>
          </li> */}

          {!isEmpty &&
            props.data.map((item) => (
              <DataMenuItemContainer
                date={item.date}
                upper={item.upper}
                lower={item.lower}
                pulse={item.pulse}
                modified={item.modified}
                // grouped={item.grouped}
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
