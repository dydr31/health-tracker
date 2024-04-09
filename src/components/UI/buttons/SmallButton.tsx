import React from 'react';
import classes from './SmallButton.module.scss'

export const SmallButton: React.FC<{ text: string, onClick: React.MouseEventHandler, active: boolean }> = (props) => {
  return <button className={`${classes['small-button']} ${props.active ? classes.active : undefined}`} onClick={props.onClick}>{props.text}</button>;
};
