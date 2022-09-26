import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import classes from '../styles/Dashboard.module.scss';

import HeaderDashboard from '../components/UI/Headers/HeaderDashboard/HeaderDashboard';
import { IoIosAddCircle } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../store/AuthContext';

const Home: NextPage = () => {
  const auth = useAuth();
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, 'projects'),
      where('creator_uid', '==', auth?.user?.uid)
    );

    const unsub = onSnapshot(q, (project) => {
      project.forEach((doc) =>
        setProjects((prevProjects) => {
          if (!prevProjects) return [doc.data()];

          return [...prevProjects, doc.data()];
        })
      );
    });

    return () => unsub();
  }, [auth]);

  console.log(projects);

  return (
    <>
      <Head>
        <title>Trollo - Dashboard</title>
        <meta name='description' content='aha' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={classes.main}>
        <HeaderDashboard />
        <section className={classes.projects}>
          <div className={classes.header}>
            <h3 className={classes.name}>My Projects</h3>
            <IconContext.Provider value={{ className: classes.add }}>
              <IoIosAddCircle />
            </IconContext.Provider>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
