import { ButtonsLeftSide } from "./ButtonsLeftSide"
import { ButtonsRow } from "./ButtonsRightSide"
import classes from './ButtonRowContainer.module.scss'

export const ButtonsRowContainer: React.FC = () => {
    return <div className={classes['button-row-container']}>
        <ButtonsLeftSide/>
        <ButtonsRow/>
    </div>
}