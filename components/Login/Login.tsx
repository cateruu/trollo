import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
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

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    const { session } = await supabaseClient.auth.signIn(
      {
        email: data.email,
        password: data.password,
      },
      {
        redirectTo: '/',
        shouldCreateUser: false,
      }
    );
    setIsLoading(false);

    if (session) {
      router.push('/');
    }
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
