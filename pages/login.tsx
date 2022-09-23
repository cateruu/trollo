import classes from '../styles/LoginPage.module.scss';

import Login from '../components/Login/Login';

const LoginPage = () => {
  return (
    <main className={classes.main}>
      <h1 className={classes.header}>Trollo</h1>
      <Login />
    </main>
  );
};

export default LoginPage;
