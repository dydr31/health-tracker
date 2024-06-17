import React from "react";
import classes from "./SmallButton.module.scss";

export const SmallButton: React.FC<{
  text: string;
  onClick: React.MouseEventHandler;
  active: boolean;
  rounded: boolean;
}> = ({onClick, rounded,text, active}) => {
  return (
    <button
      className={`${classes["small-button"]} ${
        active ? classes.active : undefined
      } ${rounded ? classes.rounded : undefined}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};
