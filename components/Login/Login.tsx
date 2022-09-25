import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import classes from './Login.module.scss';

type Data = {
  email: string;
  password: string;
};

const Login = () => {
  const [data, setData] = useState<Data>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    await auth?.signIn(data.email, data.password);
    router.push('/');

    setIsLoading(false);
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
      <button className={classes.button}>Sign in</button>
      <p className={classes.question}>
        Don`t have an account? <Link href='/signup'>Sign up</Link>
      </p>
      {isLoading && <p>Loading...</p>}
    </form>
  );
};

export default Login;
