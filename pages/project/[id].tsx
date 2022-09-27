import {
  collection,
  CollectionReference,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeaderProject from '../../components/UI/Headers/HeaderProject/HeaderProject';
import { db } from '../../config/firebase';

import classes from '../../styles/Project.module.scss';

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'projects') as CollectionReference<Project>,
      where('id', '==', id)
    );

    const unsub = onSnapshot(q, (project) => {
      project.forEach((doc) => setProject(doc.data()));
    });

    return () => unsub();
  }, [id]);

  return (
    <>
      <Head>
        <title>Trollo - {project?.title}</title>
      </Head>
      <main>
        <HeaderProject color={project?.color} />
      </main>
    </>
  );
};

export default ProjectPage;
