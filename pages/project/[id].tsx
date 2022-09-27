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
import ManageMembers from '../../components/Modals/ManageMembers/ManageMembers';
import HeaderProject from '../../components/UI/Headers/HeaderProject/HeaderProject';
import { db } from '../../config/firebase';

import classes from '../../styles/Project.module.scss';

const ProjectPage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;

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

  const handleOpenMembers = () => {
    setIsManageMembersOpen(!isManageMembersOpen);
  };

  return (
    <>
      <Head>
        <title>Trollo - {project?.title}</title>
      </Head>
      <main>
        <HeaderProject color={project?.color} />
        <section className={classes.container}>
          <header className={classes.header}>
            <h3 className={classes.name}>{project?.title}</h3>
            <button
              className={classes.members}
              style={{ backgroundColor: `#${project?.color}` }}
              onClick={handleOpenMembers}
            >
              Manage members
            </button>
          </header>
        </section>
        {isManageMembersOpen && (
          <ManageMembers
            members={project?.shared_with}
            handleOpenMembers={handleOpenMembers}
            projectId={id}
          />
        )}
      </main>
    </>
  );
};

export default ProjectPage;
