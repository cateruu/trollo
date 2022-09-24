import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import classes from './HeaderDashboard.module.scss';

const HeaderDashboard = () => {
  const router = useRouter();
  return (
    <header className={classes.header}>
      <h1 className={classes.name}>Trollo</h1>
      <button
        className={classes.logout}
        onClick={async () => {
          await supabaseClient.auth.signOut();
          router.push('/login');
        }}
      >
        Log out
      </button>
    </header>
  );
};

export default HeaderDashboard;
