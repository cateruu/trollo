import {
  collection,
  CollectionReference,
  doc,
  onSnapshot,
  QueryDocumentSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import AddTask from '../../Modals/AddTask/AddTask';
import Task from '../Task/Task';
import classes from './Card.module.scss';

import { FiEdit2 } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { RiArrowRightCircleFill } from 'react-icons/ri';

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

  useEffect(() => {
    return onSnapshot(
      collection(
        db,
        'projects',
        projectId,
        'cards',
        cardId,
        'tasks'
      ) as CollectionReference<Task>,
      (tasks) => setTasks(tasks.docs)
    );
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

  return (
    <>
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
    </>
  );
};

export default Card;
