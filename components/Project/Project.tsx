import classes from './Project.module.scss';

type Props = {
  data: Project;
  shared?: boolean;
};

const Project = ({ data, shared }: Props) => {
  return (
    <div
      className={classes.project}
      style={{ backgroundColor: `#${data.color}` }}
    >
      <h4 className={classes.title}>{data.title}</h4>
      <p className={classes.desc}>{data.description}</p>
      {shared && (
        <div className={classes.shared}>
          <p>author:</p>
          <p>{data.creator_email}</p>
        </div>
      )}
    </div>
  );
};

export default Project;
