import classes from "./DataMenu.module.scss";
import { DataMenuItem } from "./DataMenuItem";
import { List } from "../../../types/types";

export const DataMenu: React.FC<{ data: List }> = (props) => {
  let isEmpty = false;
  if (props.data.length === 0) {
    isEmpty = true;
  }
  return (
    <>
      <div className={classes["container"]}>
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
            ))}

          {isEmpty && <p>You don't have data yet</p>}
        </ul>
      </div>
    </>
  );
};
