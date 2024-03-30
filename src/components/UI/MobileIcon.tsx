import menu from '../pics/menu.png'
import classes from './MobileIcon.module.scss'

export const MobileIcon: React.FC = () => {
    return <img src={menu} className={classes.img}/>
}