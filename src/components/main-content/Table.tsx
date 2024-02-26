import { useState } from "react";
import { isTemplateMiddle } from "typescript";
import classes from "./Table.module.css";

import { Form } from "./Form";
import { ImgButton } from "../UI/ImgButton";

type List = {
  date: string;
  upper: number;
  lower: number;
  bp: number;
}[];

const dummyList: List = [
  {
    date: new Date("2024-02-01").toString().slice(3, 10),
    upper: 130,
    lower: 67,
    bp: 71,
  },
  {
    date: new Date("2024-02-02").toString().slice(3, 10),
    upper: 134,
    lower: 76,
    bp: 78,
  },
  { date: new Date().toString().slice(3, 10), upper: 129, lower: 63, bp: 69 },
  { date: new Date().toString().slice(3, 10), upper: 129, lower: 63, bp: 70 },
  { date: new Date().toString().slice(3, 10), upper: 129, lower: 63, bp: 71 },
  { date: new Date().toString().slice(3, 10), upper: 129, lower: 63, bp: 72 },
  { date: new Date().toString().slice(3, 10), upper: 129, lower: 63, bp: 73 },
  { date: new Date().toString().slice(3, 10), upper: 129, lower: 63, bp: 74 },
  { date: new Date().toString().slice(3, 10), upper: 129, lower: 63, bp: 75 },
  { date: new Date().toString().slice(3, 10), upper: 129, lower: 63, bp: 76 },
];

export const Table: React.FC = (props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formHandler = () => {
    setIsFormOpen(!isFormOpen);
  };

  let array = dummyList.slice(-8);

  const arrowHandler = () => {};

  return (
    <>
      <h2>Your tonometer measurements:</h2>
      <div className={classes.content}>
        <div className={classes.table}>
          <div className={classes['arrow-buttons-container']}>
            <ImgButton type={"left-arrow"} onClick={arrowHandler} />
            <ImgButton type={"right-arrow"} onClick={arrowHandler} />
          </div>

          <ul className={classes.ul}>
            <li>
              <p className={classes.date}>date</p>
              <p>upper</p>
              <p>lower</p>
              <p>blood pressure</p>
            </li>
            {array.map((item) => (
              <li key={Math.random()}>
                <p className={classes.date}>{item.date}</p>
                <p>{item.upper}</p>
                <p>{item.lower}</p>
                <p>{item.bp}</p>
              </li>
            ))}
          </ul>
        </div>
        {isFormOpen ? (
          <div className={classes["form-container"]}>
            <ImgButton onClick={formHandler} type={"close"} />
            <Form />
          </div>
        ) : (
          <button onClick={formHandler} className={classes["button-add-new"]}>
            ADD NEW +
          </button>
        )}
      </div>
    </>
  );
};
