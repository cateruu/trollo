import classes from './Card.module.scss';

type Props = {
  cardId: string;
  data: Card;
};

const Card = ({ cardId, data }: Props) => {
  return (
    <section
      className={classes.card}
      style={{ borderTop: `5px solid #${data.color}` }}
    >
      <header className={classes.header}>{data.title}</header>
    </section>
  );
};

export default Card;
