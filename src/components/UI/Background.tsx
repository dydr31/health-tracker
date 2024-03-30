import classes from "./Background.module.scss";

export const Background: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={classes.background}>{props.children}</div>;
};
