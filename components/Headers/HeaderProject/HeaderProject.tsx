import classes from './HeaderProject.module.scss';

import { useRouter } from 'next/router';
import { useAuth } from '../../../store/AuthContext';
import { AiFillAppstore } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { useEditProject } from '../../../store/EditProjectContext';

type Props = {
  color?: string;
};

const HeaderProject = ({ color }: Props) => {
  const router = useRouter();
  const auth = useAuth();
  const { editMode, handleEditModeChange } = useEditProject();

  return (
    <nav className={classes.header} style={{ backgroundColor: `#${color}` }}>
      <button
        className={classes.back}
        style={{ backgroundColor: `#${color}` }}
        onClick={() => {
          if (editMode) handleEditModeChange();
          router.push('/');
        }}
      >
        <AiFillAppstore /> Back home
      </button>
      <h1 className={classes.name}>Trollo</h1>
      <div className={classes.container}>
        <div
          className={classes.edit}
          style={{ backgroundColor: `#${color}` }}
          onClick={handleEditModeChange}
        >
          {editMode ? <AiOutlineClose /> : <FiEdit2 />}
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
