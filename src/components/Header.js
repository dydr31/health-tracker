import { useContext } from 'react';
import { LogInContext } from '../store/login-context';
import classes from './Header.module.css'

export const Header = (props) => {
    const LogInCtx = useContext(LogInContext)
    console.log(LogInCtx)
  return <header className={classes.header}>
    <div>
        {LogInCtx.LogIn ? LogInCtx.Email : "You've logged off"}
    </div>
  </header>;
};
