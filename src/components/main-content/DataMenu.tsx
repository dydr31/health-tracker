import { ImgButton } from "../UI/ImgButton";
import { Modal } from "../UI/Modal";
import classes from './DataMenu.module.scss'
import { DateDisplay } from "./DateDisplay";

export const DataMenu: React.FC<{
  data: { date: string; upper: number; lower: number; pulse: number }[];
}> = (props) => {

    const deleteHandler = () => {

    }


  return (
    <>
      <div className={classes['container']}>
        
        <ul>
            <li className={classes.labels}>
                <p>date</p>
                <p>upper</p>
                <p>lower</p>
                <p>pulse</p>
            </li>
            
            
            {props.data.map(item => <li key={Math.random()}>
                <ImgButton type={'close'} onClick={deleteHandler}/>
            <DateDisplay date={item.date}/>
            <p>{item.upper}</p>
            <p>{item.lower}</p>
            <p>{item.pulse}</p>
        </li>)}</ul>
      </div>
    </>
  );
};
