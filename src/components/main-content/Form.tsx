import { Button } from "../UI/Button";
import classes from "./Form.module.css";

export const Form: React.FC = () => {
  const sumbitForm = () => {};

  return (
    <form className={classes.form}>
      <div>
        <input type="date" />
        <input type="number" placeholder="upper" />
        <input type="number" placeholder="lower" />
        <input type="number" placeholder="blood pressure" />
      </div>

      <Button text="save" onClick={sumbitForm} />
    </form>
  );
};
