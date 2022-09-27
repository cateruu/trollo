import classes from './HeaderProject.module.scss';

import { AiFillAppstore } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../store/AuthContext';

type Props = {
  color?: string;
};

const HeaderProject = ({ color }: Props) => {
  const router = useRouter();
  const auth = useAuth();

  return (
    <nav className={classes.header} style={{ backgroundColor: `#${color}` }}>
      <button
        className={classes.back}
        style={{ backgroundColor: `#${color}` }}
        onClick={() => router.push('/')}
      >
        <AiFillAppstore /> Back home
      </button>
      <h1 className={classes.name}>Trollo</h1>
      <button
        className={classes.logout}
        style={{ backgroundColor: `#${color}` }}
        onClick={async () => await auth?.signOut()}
      >
        Logout
      </button>
    </nav>
  );
};

export default HeaderProject;
