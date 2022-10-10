import classes from './HeaderProject.module.scss';

import { useRouter } from 'next/router';
import { useAuth } from '../../../../store/AuthContext';
import { AiFillAppstore } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { IconContext } from 'react-icons';

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
      <div className={classes.container}>
        <div className={classes.edit} style={{ backgroundColor: `#${color}` }}>
          <FiEdit2 />
        </div>
        <button
          className={classes.logout}
          style={{ backgroundColor: `#${color}` }}
          onClick={async () => await auth?.signOut()}
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default HeaderProject;
