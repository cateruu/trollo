import { FirebaseError } from 'firebase/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { getAuthErrorMessage } from '../../utils/getAuthErrorMessage';
import Loader from '../Loader/Loader';
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const auth = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (data.password !== data.confirmPassword) {
      setErrorMsg('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    try {
      await auth?.signUp(data.email, data.password);
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMsg(getAuthErrorMessage(error.code));
      }
    }
    setIsLoading(false);
  };

  const handleChange = (data: string, object: string) => {
    setData((prevData) => ({ ...prevData, [object]: data }));
  };

  return (
    <form
      className={`${classes.form} ${errorMsg && classes.error}`}
      onSubmit={handleSubmit}
    >
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
      {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
      <button className={classes.button}>
        {isLoading ? <Loader /> : 'Sign in'}
      </button>
      <p className={classes.question}>
        Already have an account? <Link href='/login'>Sign in</Link>
      </p>
    </form>
  );
};

export default Signup;
