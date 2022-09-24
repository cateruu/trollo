import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import classes from '../styles/Home.module.scss';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import HeaderDashboard from '../components/UI/Headers/HeaderDashboard/HeaderDashboard';
import { useUser } from '@supabase/auth-helpers-react';

const Home: NextPage = () => {
  const user = useUser();
  return (
    <>
      <Head>
        <title>Trollo</title>
        <meta name='description' content='aha' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={classes.main}>
        <HeaderDashboard />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(context) {
    return { props: {} };
  },
});

export default Home;
