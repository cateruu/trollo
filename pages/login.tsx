import Login from '../components/Login/Login';
import classes from '../styles/LoginPage.module.scss';

const login = () => {
  return (
    <main className={classes.main}>
      <h1 className={classes.header}>Trollo</h1>
      <Login />
    </main>
  );
};

export default login;
