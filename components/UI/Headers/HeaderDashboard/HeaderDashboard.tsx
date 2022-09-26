import { useRouter } from 'next/router';
import { useAuth } from '../../../../store/AuthContext';
import classes from './HeaderDashboard.module.scss';

const HeaderDashboard = () => {
  const auth = useAuth();

  return (
    <header className={classes.header}>
      <h1 className={classes.name}>Trollo</h1>
      <button
        className={classes.logout}
        onClick={async () => {
          await auth?.signOut();
        }}
      >
        Log out
      </button>
    </header>
  );
};

export default HeaderDashboard;
