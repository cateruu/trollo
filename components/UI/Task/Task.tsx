import classes from './Task.module.scss';

import { AiOutlineDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

type Props = {
  data: Task;
  projectId: string;
  cardId: string;
  taskId: string;
};

const Task = ({ data, projectId, cardId, taskId }: Props) => {
  let color;
  switch (data.priority) {
    case 'Low':
      color = '#75f089';
      break;
    case 'Mid':
      color = '#75a6f0';
      break;
    case 'High':
      color = '#f07575';
      break;
    default:
      color = '#fff';
      break;
  }

  const handleDelete = async () => {
    try {
      await deleteDoc(
        doc(db, 'projects', projectId, 'cards', cardId, 'tasks', taskId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.task}>
      <IconContext.Provider value={{ className: classes.delete }}>
        <AiOutlineDelete onClick={handleDelete} />
      </IconContext.Provider>
      <div style={{ backgroundColor: color }} className={classes.priority}>
        {data.priority} priority
      </div>
      {data.task}
    </div>
  );
};

export default Task;
