import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import classes from './Login.module.scss';

type Data = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [data, setData] = useState<Data>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) return;
  };

  const handleChange = (data: string, object: string) => {
    setData((prevData) => ({ ...prevData, [object]: data }));
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label className={classes.label} htmlFor='email'>
        Email
      </label>
      <input
        type='Email'
        className={classes.input}
        id='email'
        value={data.email}
        onChange={(e) => handleChange(e.target.value, 'email')}
      />
      <label className={classes.label} htmlFor='password'>
        Password
      </label>
      <input
        type='Password'
        className={classes.input}
        id='password'
        value={data.password}
        onChange={(e) => handleChange(e.target.value, 'password')}
      />
      <label className={classes.label} htmlFor='confirmPassword'>
        Confirm password
      </label>
      <input
        type='Password'
        className={classes.input}
        id='confirmPassword'
        value={data.confirmPassword}
        onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
      />
      <button className={classes.button}>Sign up</button>
      <p className={classes.question}>
        Already have an account? <Link href='/login'>Sign in</Link>
      </p>
    </form>
  );
};

export default Signup;
