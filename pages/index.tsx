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
import AddProjectModal from '../components/Modals/AddProject/AddProjectModal';

const Home: NextPage = () => {
  const auth = useAuth();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

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

  const openAddProject = () => {
    setIsAddProjectOpen(!isAddProjectOpen);
  };

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
              <IoIosAddCircle onClick={openAddProject} />
            </IconContext.Provider>
          </div>
          <div className={classes.projects}>
            {projects?.map((project) => (
              <Project key={project.id} data={project} />
            ))}
          </div>
        </section>
        {isAddProjectOpen && (
          <AddProjectModal openAddProject={openAddProject} />
        )}
      </main>
    </>
  );
};

export default Home;
