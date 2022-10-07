import {
  collection,
  CollectionReference,
  onSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import AddTask from '../../Modals/AddTask/AddTask';
import Task from '../Task/Task';
import classes from './Card.module.scss';

import { FiEdit2 } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';

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
    setEditModeOpen(!editModeOpen);
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
        <header className={classes.header}>{data.title}</header>
        {tasks?.map((task) => (
          <Task key={task.id} data={task.data()} />
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
