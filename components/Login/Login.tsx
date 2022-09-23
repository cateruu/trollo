import Link from 'next/link';
import classes from './Login.module.scss';

const Login = () => {
  return (
    <form className={classes.form}>
      <label className={classes.label} htmlFor='email'>
        Email
      </label>
      <input type='Email' className={classes.input} id='email' />
      <label className={classes.label} htmlFor='password'>
        Password
      </label>
      <input type='Password' className={classes.input} id='password' />
      <button className={classes.button}>Sign in</button>
      <p className={classes.question}>
        Don`t have an account? <Link href='/singnup'>Sign up</Link>
      </p>
    </form>
  );
};

export default Login;
