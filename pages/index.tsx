import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Trollo</title>
        <meta name='description' content='aha' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>index</main>
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
