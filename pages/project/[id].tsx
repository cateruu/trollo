import {
  collection,
  CollectionReference,
  doc,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import AddCard from '../../components/Modals/AddCard/AddCard';
import ManageMembers from '../../components/Modals/ManageMembers/ManageMembers';
import Card from '../../components/UI/Card/Card';
import HeaderProject from '../../components/UI/Headers/HeaderProject/HeaderProject';
import { db } from '../../config/firebase';
import { useAuth } from '../../store/AuthContext';

import classes from '../../styles/Project.module.scss';

const ProjectPage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [cards, setCards] = useState<Card[] | null>(null);

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
    return onSnapshot(
      collection(
        db,
        'projects',
        id as string,
        'cards'
      ) as CollectionReference<Card>,
      (cards) => {
        const temp: Card[] = [];
        cards.forEach((doc) => {
          temp.push(doc.data());
        });

        if (temp.length > 0) setCards(temp);
      }
    );
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
            {cards?.map((card) => (
              <Card key={card.id} data={card} />
            ))}
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
        {isAddCardOpen && (
          <AddCard handleAddCard={handleAddCard} projectId={id as string} />
        )}
      </main>
    </>
  );
};

export default ProjectPage;
