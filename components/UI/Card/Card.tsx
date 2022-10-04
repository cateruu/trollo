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

  console.log(tasks);

  const handleAddTask = () => {
    setIsAddTaskOpen(!isAddTaskOpen);
  };

  return (
    <>
      <section
        className={classes.card}
        style={{ borderTop: `5px solid #${data.color}` }}
      >
        <header className={classes.header}>{data.title}</header>
        {tasks?.map((task) => (
          <Task key={task.id} />
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
