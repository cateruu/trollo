import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import classes from '../styles/Home.module.scss';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import HeaderDashboard from '../components/UI/Headers/HeaderDashboard/HeaderDashboard';

import { IoIosAddCircle } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import AddWorkspace from '../components/Modals/AddWorkspace/AddWorkspace';
import { openAddWorkspace } from '../features/addWorkplace/addWorkplaceSlice';

const Home: NextPage = () => {
  const { isOpen } = useAppSelector((state) => state.addWorkspace);
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>Trollo</title>
        <meta name='description' content='aha' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={classes.main}>
        <HeaderDashboard />
        {/* <section className={classes.container}>
          <div className={classes.section}>
            <h3 className={classes.name}>My Workspaces</h3>
            <IconContext.Provider value={{ className: classes.add }}>
              <IoIosAddCircle />
            </IconContext.Provider>
          </div>
        </section>
        {isOpen && <AddWorkspace />} */}
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
