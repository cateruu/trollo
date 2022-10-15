import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DragEvent, useEffect, useRef, useState } from 'react';
import AddCard from '../../components/Modals/AddCard/AddCard';
import ManageMembers from '../../components/Modals/ManageMembers/ManageMembers';
import Card from '../../components/Card/Card';
import HeaderProject from '../../components/Headers/HeaderProject/HeaderProject';
import { db } from '../../config/firebase';

import classes from '../../styles/Project.module.scss';
import Header from '../../components/Project/Header';
import { useAppDispatch } from '../../utils/reduxHooks';
import { setLastCardOrder } from '../../features/order/orderSlice';
import { reevaluateCardsOrder } from '../../utils/reevaluateCardsOrder';

export type DragTaskType = {
  card: string;
  task: string;
};

const ProjectPage = () => {
  const [project, setProject] = useState<Project | undefined | null>(null);
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [cards, setCards] = useState<Card[] | null>(null);
  const [dragging, setDragging] = useState(false);

  const dragTask = useRef<DragTaskType | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  // getting project
  useEffect(() => {
    return onSnapshot(
      doc(db, 'projects', id as string) as DocumentReference<Project>,
      (snapshot) => setProject(snapshot.data())
    );
  }, [id]);

  // getting project cards
  useEffect(() => {
    const q = query(
      collection(
        db,
        'projects',
        id as string,
        'cards'
      ) as CollectionReference<CardData>,
      orderBy('order', 'asc')
    );

    reevaluateCardsOrder(id as string);

    return onSnapshot(q, (cards) => {
      let temp: Card[] = [];
      cards.forEach((card) =>
        temp.push({ id: card.id, data: card.data(), tasks: [] })
      );
      setCards(temp);
    });
  }, [id]);

  const handleOpenMembers = () => {
    setIsManageMembersOpen(!isManageMembersOpen);
  };

  const handleAddCard = () => {
    setIsAddCardOpen(!isAddCardOpen);
  };

  const handleDragStart = (e: DragEvent, params: DragTaskType) => {
    dragTask.current = params;
    dragNode.current = e.target as HTMLDivElement;
    dragNode.current?.addEventListener('dragend', handleDragEnd);
    setTimeout(() => setDragging(true), 0);
  };

  const handleDragEnter = (e: DragEvent, params: DragTaskType) => {
    if (dragNode.current === e.target) return;

    const currentTask = dragTask.current;
    const currentTaskCardIndex = cards!.indexOf(
      cards!.find((card) => card.id === currentTask!.card) as Card
    );
    const currentTaskIndex = cards![currentTaskCardIndex].tasks.indexOf(
      cards![currentTaskCardIndex].tasks.find(
        (task) => task.id === currentTask!.task
      ) as Task
    );

    const cardIndex = cards!.indexOf(
      cards!.find((card) => card.id === params.card) as Card
    );
    const taskIndex = cards![cardIndex].tasks.indexOf(
      cards![cardIndex].tasks.find((task) => task.id === params.task) as Task
    );

    console.log(currentTaskCardIndex, currentTaskIndex);

    setCards((prevCards) => {
      let newCards = JSON.parse(JSON.stringify(prevCards));
      if (prevCards) {
        newCards[cardIndex].tasks.splice(
          taskIndex,
          0,
          newCards[currentTaskCardIndex].tasks.splice(currentTaskIndex, 1)[0]
        );
        dragTask.current = params;
      }

      return newCards;
    });
  };

  const handleDragEnd = () => {
    dragNode.current?.removeEventListener('dragend', handleDragEnd);
    dragNode.current = null;
    setDragging(false);
  };

  const getDragItemStyle = (params: DragTaskType) => {
    if (
      params.card === dragTask.current?.card &&
      params.task === dragTask.current.task
    ) {
      return 'draggable';
    }
  };

  return (
    <>
      <Head>
        <title>Trollo - {project?.title}</title>
      </Head>
      <main className={classes.main}>
        <HeaderProject color={project?.color} project={project} />
        <section className={classes.container}>
          <Header
            project={project}
            handleOpenMembers={handleOpenMembers}
            projectId={id as string}
          />
          <section className={classes.cards}>
            {cards?.map((card) => {
              dispatch(setLastCardOrder(card.data.order));

              return (
                <Card
                  key={card.id}
                  cardId={card.id}
                  projectId={id as string}
                  data={card.data}
                  cards={cards}
                  tasks={card.tasks}
                  setCards={setCards}
                  dragging={dragging}
                  handleDragStart={handleDragStart}
                  handleDragEnter={handleDragEnter}
                  getDragItemStyle={getDragItemStyle}
                />
              );
            })}
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
