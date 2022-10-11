import {
  collection,
  CollectionReference,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import AddTask from '../Modals/AddTask/AddTask';
import Task from '../Task/Task';
import classes from './Card.module.scss';

import { FiEdit2 } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { RiArrowRightCircleFill } from 'react-icons/ri';
import { useEditProject } from '../../store/EditProjectContext';

type Props = {
  cardId: string;
  projectId: string;
  data: Card;
};

const Card = ({ cardId, projectId, data }: Props) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState<QueryDocumentSnapshot<Task>[] | null>(
    null
  );
  const [editModeOpen, setEditModeOpen] = useState(false);
  const [titleInput, setTitleInput] = useState(data.title);

  const { editMode } = useEditProject();

  useEffect(() => {
    const q = query(
      collection(
        db,
        'projects',
        projectId,
        'cards',
        cardId,
        'tasks'
      ) as CollectionReference<Task>,
      orderBy('timestamp', 'desc')
    );

    return onSnapshot(q, (tasks) => setTasks(tasks.docs));
  }, [projectId, cardId]);

  const handleAddTask = () => {
    setIsAddTaskOpen(!isAddTaskOpen);
  };

  const handleOpenEditMode = () => {
    setTitleInput(data.title);
    setEditModeOpen(!editModeOpen);
  };

  const handleTitleInput = (input: string) => {
    setTitleInput(input);
  };

  const submitNewTitle = async () => {
    const cardRef = doc(db, 'projects', projectId, 'cards', cardId);

    try {
      await updateDoc(cardRef, {
        title: titleInput,
      });
    } catch (error) {
      console.error(error);
    }

    handleOpenEditMode();
  };

  const increaseCardOrder = async () => {
    let tempOrder = data.order;
    const cardBeforeQuery = query(
      collection(db, 'projects', projectId, 'cards'),
      where('order', '==', --tempOrder)
    );

    let cardBeforeRef;
    try {
      const querySnapshot = await getDocs(cardBeforeQuery);
      querySnapshot.forEach((doc) => (cardBeforeRef = doc.ref));
    } catch (error) {
      console.log(error);
    }

    if (cardBeforeRef) {
      // change order of card before
      try {
        await updateDoc(cardBeforeRef, {
          order: data.order,
        });
      } catch (error) {
        console.log(error);
      }

      // change order of current card
      try {
        const currentCardRef = doc(db, 'projects', projectId, 'cards', cardId);

        let tempOrder = data.order;
        await updateDoc(currentCardRef, {
          order: --tempOrder,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const lowerCardOrder = async () => {
    let tempOrder = data.order;
    const cardAfterQuery = query(
      collection(db, 'projects', projectId, 'cards'),
      where('order', '==', ++tempOrder)
    );

    let cardAfterRef;
    try {
      const querySnapshot = await getDocs(cardAfterQuery);
      querySnapshot.forEach((doc) => (cardAfterRef = doc.ref));
    } catch (error) {
      console.log(error);
    }

    if (cardAfterRef) {
      // change order of card after
      try {
        await updateDoc(cardAfterRef, {
          order: data.order,
        });
      } catch (error) {
        console.log(error);
      }

      // change order of current card
      try {
        const currentCardRef = doc(db, 'projects', projectId, 'cards', cardId);

        let tempOrder = data.order;
        await updateDoc(currentCardRef, {
          order: ++tempOrder,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section>
      {editMode && (
        <div className={classes.editOrder}>
          <BsArrowLeft onClick={increaseCardOrder} />
          <BsArrowRight onClick={lowerCardOrder} />
        </div>
      )}
      <section
        className={classes.card}
        style={{ borderTop: `5px solid #${data.color}` }}
      >
        {editModeOpen ? (
          <IconContext.Provider value={{ className: classes.close }}>
            <AiFillCloseCircle onClick={handleOpenEditMode} />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ className: classes.edit }}>
            <FiEdit2 onClick={handleOpenEditMode} />
          </IconContext.Provider>
        )}
        <header className={classes.header}>
          {editModeOpen ? (
            <div className={classes.titleInput}>
              <input
                type='email'
                id='members'
                value={titleInput}
                onChange={(e) => handleTitleInput(e.target.value)}
              />
              <button>
                <RiArrowRightCircleFill onClick={submitNewTitle} />
              </button>
            </div>
          ) : (
            data.title
          )}
        </header>
        {tasks?.map((task) => (
          <Task
            key={task.id}
            data={task.data()}
            projectId={projectId}
            cardId={cardId}
            taskId={task.id}
          />
        ))}
        <button className={classes.add} onClick={handleAddTask}>
          Add task
        </button>
      </section>
      {isAddTaskOpen && (
        <AddTask
          handleAddTask={handleAddTask}
          cardId={cardId}
          projectId={projectId}
        />
      )}
    </section>
  );
};

export default Card;
