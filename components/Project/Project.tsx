import classes from './Project.module.scss';

type Props = {
  data: Project;
};

const Project = ({ data }: Props) => {
  return (
    <div
      className={classes.project}
      style={{ backgroundColor: `#${data.color}` }}
    >
      <h4 className={classes.title}>{data.title}</h4>
      <p className={classes.desc}>{data.description}</p>
    </div>
  );
};

export default Project;
