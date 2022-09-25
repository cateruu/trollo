import { useRouter } from 'next/router';
import classes from './HeaderDashboard.module.scss';

const HeaderDashboard = () => {
  const router = useRouter();
  return (
    <header className={classes.header}>
      <h1 className={classes.name}>Trollo</h1>
      <button className={classes.logout} onClick={async () => {}}>
        Log out
      </button>
    </header>
  );
};

export default HeaderDashboard;
