import React from 'react';
import classes from './Button.module.scss'

export const Button: React.FC<{ text: string, onClick: React.MouseEventHandler }> = (props) => {
  return <button className={classes.button} onClick={props.onClick}>{props.text}</button>;
};
