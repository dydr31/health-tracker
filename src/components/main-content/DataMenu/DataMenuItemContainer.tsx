import classes from "./DataMenuItemContainer.module.scss";
import { DateDisplay } from "./DateDisplay";
import { useContext, useState } from "react";
import { DataContext } from "../../../store/data-context";
import { TransparentButton } from "../../UI/buttons/TransparentButton";
import { LogInContext } from "../../../store/login-context";
import { ImgButton } from "../../UI/buttons/ImgButton";
import { Date2 } from "../../../types/types";
import { DataMenuItem } from "./DataMenuItem";

export const DataMenuItemContainer: React.FC<{
  date: Date2;
  upper: number;
  lower: number;
  pulse: number;
  modified: boolean;
  // grouped: boolean;
}> = (props) => {

  const { items } = useContext(DataContext);

  const [showMenu, setShowMenu] = useState(false);
  const [sameDateItems, setSameDateItems] = useState([
    {
      date: { seconds: 0, nanoseconds: 0 },
      upper: 0,
      lower: 0,
      pulse: 0,
      modified: false,
    },
  ]);

  const asteriscHandler = () => {
    let itemsOfTheSameDate = items.filter(
      (x) =>
        new Date(x.date.seconds * 1000).getDay() ===
          new Date(props.date.seconds * 1000).getDay() &&
        new Date(x.date.seconds * 1000).getMonth() ===
          new Date(props.date.seconds * 1000).getMonth() &&
        new Date(x.date.seconds * 1000).getFullYear() ===
          new Date(props.date.seconds * 1000).getFullYear()
    );
    setShowMenu(!showMenu);
    setSameDateItems(itemsOfTheSameDate);
  };

  return (
    <li className={classes.li}>
      <div className={classes["floating-button"]}>
        {props.modified && (
          <TransparentButton type="asterisc" onClick={asteriscHandler} />
        )}
      </div>
      {!showMenu && (
        <DataMenuItem
          date={props.date}
          upper={props.upper}
          lower={props.lower}
          pulse={props.pulse}
          modified={props.modified}
          key={Math.random()}
        />
      )}
      {showMenu &&
        sameDateItems.map((x) => (
          <>
            <DataMenuItem
              date={x.date}
              upper={x.upper}
              lower={x.lower}
              pulse={x.pulse}
              modified={x.modified}
              key={Math.random()}
            />
          </>
        ))}
    </li>
  );
};
