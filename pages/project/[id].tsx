import {
  collection,
  CollectionReference,
  doc,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import AddCard from '../../components/Modals/AddCard/AddCard';
import ManageMembers from '../../components/Modals/ManageMembers/ManageMembers';
import Card from '../../components/Card/Card';
import HeaderProject from '../../components/Headers/HeaderProject/HeaderProject';
import { db } from '../../config/firebase';
import { useAuth } from '../../store/AuthContext';

import classes from '../../styles/Project.module.scss';

const ProjectPage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [cards, setCards] = useState<QueryDocumentSnapshot<Card>[] | null>(
    null
  );

  const auth = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getProject = async () => {
      const docRef = doc(db, 'projects', id as string);
      const docSnap = (await getDoc(docRef)) as DocumentSnapshot<Project>;

      if (docSnap.exists()) {
        setProject(docSnap.data());
      } else {
        console.error('No project found!');
      }
    };

    getProject();
  }, [id]);

  useEffect(() => {
    const q = query(
      collection(
        db,
        'projects',
        id as string,
        'cards'
      ) as CollectionReference<Card>,
      orderBy('timestamp', 'asc')
    );

    return onSnapshot(q, (cards) => setCards(cards.docs));
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
      <main className={classes.main}>
        <HeaderProject color={project?.color} />
        <section className={classes.container}>
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
            {cards?.map((card) => (
              <Card
                key={card.id}
                cardId={card.id}
                projectId={id as string}
                data={card.data()}
              />
            ))}
            <button className={classes.add} onClick={handleAddCard}>
              Add card
            </button>
          </section>
        </section>
        {isManageMembersOpen && (
          <ManageMembers
            members={project?.shared_with}
            handleOpenMembers={handleOpenMembers}
            projectId={id as string}
          />
        )}
        {isAddCardOpen && (
          <AddCard handleAddCard={handleAddCard} projectId={id as string} />
        )}
      </main>
    </>
  );
};

export default ProjectPage;
