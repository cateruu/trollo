import { DragEvent, useRef, useState } from 'react';

import classes from './Task.module.scss';

import { AiOutlineDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { DragTaskType } from '../../pages/project/[id]';

type Props = {
  data: Task;
  projectId: string;
  cardId: string;
  taskId: string;
  dragging: boolean;
  handleDragStart: (e: DragEvent, params: DragTaskType) => void;
  handleDragEnter: (e: DragEvent, params: DragTaskType) => void;
  getDragItemStyle: (params: DragTaskType) => string | undefined;
};

const Task = ({
  data,
  projectId,
  cardId,
  taskId,
  dragging,
  handleDragStart,
  handleDragEnter,
  getDragItemStyle,
}: Props) => {
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
    <div
      className={`${classes.task} ${
        dragging &&
        getDragItemStyle({ card: cardId, task: taskId }) &&
        classes.dragging
      }`}
      draggable
      onDragStart={(e) => handleDragStart(e, { card: cardId, task: taskId })}
      onDragEnter={
        dragging
          ? (e) => handleDragEnter(e, { card: cardId, task: taskId })
          : undefined
      }
    >
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
