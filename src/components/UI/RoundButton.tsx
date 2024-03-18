import classes from './RoundButton.module.scss'

export const RoundButton: React.FC<{
    onClick: React.MouseEventHandler
}> = (props) => {
    return <button onClick={props.onClick} className={classes['round-button']}>+</button>
}