import classes from '../styles/LoginPage.module.scss';

import Signup from '../components/Login/Singup';

const SignupPage = () => {
  return (
    <main className={classes.main}>
      <h1 className={classes.header}>Trollo</h1>
      <Signup />
    </main>
  );
};

export default SignupPage;
