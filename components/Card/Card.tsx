import {
  collection,
  CollectionReference,
  deleteDoc,
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
import { AiFillCloseCircle, AiOutlineDelete } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { RiArrowRightCircleFill } from 'react-icons/ri';
import { useEditProject } from '../../store/EditProjectContext';
import { reevaluateCardsOrder } from '../../utils/reevaluateCardsOrder';

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
  const [changeTitleModeOpen, setChangeTitleModeOpen] = useState(false);
  const [titleInput, setTitleInput] = useState(data.title);

  const { editMode } = useEditProject();

  // getting card tasks
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

  const handleChangeTitleModeOpen = () => {
    setTitleInput(data.title);
    setChangeTitleModeOpen(!changeTitleModeOpen);
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

    handleChangeTitleModeOpen();
  };

  const changeCardOrder = async (action: string) => {
    let tempOrder = data.order;
    const cardQuery = query(
      collection(db, 'projects', projectId, 'cards'),
      where('order', '==', action === 'increase' ? --tempOrder : ++tempOrder)
    );

    let cardRef;
    try {
      const querySnapshot = await getDocs(cardQuery);
      querySnapshot.forEach((doc) => (cardRef = doc.ref));
    } catch (error) {
      console.log(error);
    }

    if (cardRef) {
      // change order of card before
      try {
        await updateDoc(cardRef, {
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
          order: action === 'increase' ? --tempOrder : ++tempOrder,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteCard = async () => {
    try {
      await deleteDoc(doc(db, 'projects', projectId, 'cards', cardId));
      reevaluateCardsOrder(projectId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      {editMode && (
        <div className={classes.editOrder}>
          <BsArrowLeft onClick={() => changeCardOrder('increase')} />
          <AiOutlineDelete onClick={deleteCard} />
          <BsArrowRight onClick={() => changeCardOrder('lower')} />
        </div>
      )}
      <section
        className={classes.card}
        style={{ borderTop: `5px solid #${data.color}` }}
      >
        {changeTitleModeOpen ? (
          <IconContext.Provider value={{ className: classes.close }}>
            <AiFillCloseCircle onClick={handleChangeTitleModeOpen} />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ className: classes.edit }}>
            <FiEdit2 onClick={handleChangeTitleModeOpen} />
          </IconContext.Provider>
        )}
        <header className={classes.header}>
          {changeTitleModeOpen ? (
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
