import classes from './Messade.module.scss'

export const Message: React.FC<{children: React.ReactNode}> = (props) => {
    return <>
    <div className={classes.message}>
        {props.children}</div></>
}