import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import classes from '../styles/Home.module.scss';

import HeaderDashboard from '../components/UI/Headers/HeaderDashboard/HeaderDashboard';

const Home: NextPage = () => {
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

export default Home;
