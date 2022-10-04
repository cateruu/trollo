import classes from './Card.module.scss';

type Props = {
  data: Card;
};

const Card = ({ data }: Props) => {
  return <div>{data.title}</div>;
};

export default Card;
