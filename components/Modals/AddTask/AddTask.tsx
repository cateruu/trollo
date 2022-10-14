import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { FormEvent, useState } from 'react';
import { db } from '../../../config/firebase';
import classes from './AddTask.module.scss';

type Props = {
  handleAddTask: () => void;
  cardId: string;
  projectId: string;
};

type Task = {
  task: string;
  priority: string;
};

const AddTask = ({ handleAddTask, cardId, projectId }: Props) => {
  const [task, setTask] = useState<Task>({
    task: '',
    priority: 'Low',
  });

  const handleTaskChange = (value: string, object: string) => {
    setTask((prevTask) => ({ ...prevTask, [object]: value }));
  };

  const handleTaskSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!task) {
      handleAddTask();
      return;
    }

    try {
      handleAddTask();
      await addDoc(
        collection(db, 'projects', projectId, 'cards', cardId, 'tasks'),
        {
          card: cardId,
          task: task.task,
          priority: task.priority,
          timestamp: Timestamp.now(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={classes.opacity} onClick={handleAddTask}></div>
      <div className={classes.container}>
        <h2 className={classes.header}>Add task</h2>
        <form className={classes.form} onSubmit={handleTaskSubmit} id='form'>
          <label htmlFor='task' className={classes.label}>
            Task
          </label>
          <input
            type='text'
            className={classes.input}
            id='task'
            value={task.task}
            onChange={(e) => handleTaskChange(e.target.value, 'task')}
          />
          <label htmlFor='priority' className={classes.label}>
            Priority
          </label>
          <select
            id='priority'
            value={task.priority}
            onChange={(e) => handleTaskChange(e.target.value, 'priority')}
            className={classes.select}
          >
            <option value='Low'>Low</option>
            <option value='Mid'>Mid</option>
            <option value='High'>High</option>
          </select>
        </form>
        <div className={classes.buttons}>
          <button
            className={`${classes.button} ${classes.cancel}`}
            onClick={handleAddTask}
          >
            Cancel
          </button>
          <button className={`${classes.button} ${classes.add}`} form='form'>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTask;
