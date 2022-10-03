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
import AddCard from '../../components/Modals/AddCard/AddCard';
import ManageMembers from '../../components/Modals/ManageMembers/ManageMembers';
import HeaderProject from '../../components/UI/Headers/HeaderProject/HeaderProject';
import { auth, db } from '../../config/firebase';
import { useAuth } from '../../store/AuthContext';

import classes from '../../styles/Project.module.scss';

const ProjectPage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [categories, setCategories] = useState(null);

  const auth = useAuth();
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

  const handleAddCard = () => {
    setIsAddCardOpen(!isAddCardOpen);
  };

  return (
    <>
      <Head>
        <title>Trollo - {project?.title}</title>
      </Head>
      <main>
        <HeaderProject color={project?.color} />
        <article className={classes.container}>
          <header className={classes.header}>
            <h3 className={classes.name}>{project?.title}</h3>
            {auth?.user?.uid === project?.creator_uid && (
              <button
                className={classes.members}
                style={{ backgroundColor: `#${project?.color}` }}
                onClick={handleOpenMembers}
              >
                Manage members
              </button>
            )}
          </header>
          <section className={classes.cards}>
            <button className={classes.add} onClick={handleAddCard}>
              Add card
            </button>
          </section>
        </article>
        {isManageMembersOpen && (
          <ManageMembers
            members={project?.shared_with}
            handleOpenMembers={handleOpenMembers}
            projectId={id as string}
          />
        )}
        {isAddCardOpen && <AddCard handleAddCard={handleAddCard} />}
      </main>
    </>
  );
};

export default ProjectPage;
