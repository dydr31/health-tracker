import classes from './Header.module.css'

export const Header = (props) => {
  let isLoggedIn = localStorage.getItem("Log In");
  if (isLoggedIn === "true") {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  let email = localStorage.getItem('Email')
  console.log(email)
  return <header className={classes.header}>
    <div>
        {isLoggedIn ? email : "You've logged off"}
    </div>
  </header>;
};
