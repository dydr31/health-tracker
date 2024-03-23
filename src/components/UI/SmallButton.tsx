import React from 'react';
import classes from './SmallButton.module.scss'

export const SmallButton: React.FC<{ text: string, onClick: React.MouseEventHandler }> = (props) => {
  return <button className={classes['small-button']} onClick={props.onClick}>{props.text}</button>;
};
