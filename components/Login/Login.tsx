import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { supabase } from '../../config/supabase';
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const { user, error, session } = await supabase.auth.signIn(
      {
        email: data.email,
        password: data.password,
      },
      {
        shouldCreateUser: false,
      }
    );
    setLoading(false);

    if (session) router.push('/');
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
        onChange={(e) => handleChange(e.target.value, 'email')}
      />
      <label className={classes.label} htmlFor='password'>
        Password
      </label>
      <input
        type='Password'
        className={classes.input}
        id='password'
        onChange={(e) => handleChange(e.target.value, 'password')}
      />
      <button className={classes.button}>Sign in</button>
      <p className={classes.question}>
        Don`t have an account? <Link href='/signup'>Sign up</Link>
      </p>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default Login;
