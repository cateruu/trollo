import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import classes from '../styles/Dashboard.module.scss';

import HeaderDashboard from '../components/UI/Headers/HeaderDashboard/HeaderDashboard';
import { IoIosAddCircle } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';

import {
  collection,
  CollectionReference,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../store/AuthContext';
import Project from '../components/Project/Project';

const Home: NextPage = () => {
  const auth = useAuth();
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'projects') as CollectionReference<Project>,
      where('creator_uid', '==', auth?.user?.uid)
    );

    const unsub = onSnapshot(q, (project) => {
      const temp: Project[] = [];
      project.forEach((doc) => {
        temp.push(doc.data());
      });

      setProjects(temp);
    });

    return () => unsub();
  }, [auth]);

  return (
    <>
      <Head>
        <title>Trollo - Dashboard</title>
        <meta name='description' content='aha' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={classes.main}>
        <HeaderDashboard />
        <section className={classes.projectsContainer}>
          <div className={classes.header}>
            <h3 className={classes.name}>My Projects</h3>
            <IconContext.Provider value={{ className: classes.add }}>
              <IoIosAddCircle />
            </IconContext.Provider>
          </div>
          <div className={classes.projects}>
            {projects?.map((project) => (
              <Project key={project.id} data={project} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
