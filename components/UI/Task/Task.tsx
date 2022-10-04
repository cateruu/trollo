import classes from './Task.module.scss';

type Props = {
  data: Task;
};

const Task = ({ data }: Props) => {
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

  return (
    <div className={classes.task}>
      <div style={{ backgroundColor: color }} className={classes.priority}>
        {data.priority} priority
      </div>
      {data.task}
    </div>
  );
};

export default Task;
