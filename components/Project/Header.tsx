import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { RiArrowRightCircleFill } from 'react-icons/ri';
import { db } from '../../config/firebase';
import { useAuth } from '../../store/AuthContext';
import { useEditProject } from '../../store/EditProjectContext';
import classes from './Header.module.scss';

type Props = {
  project: Project | null | undefined;
  handleOpenMembers: () => void;
  projectId: string;
};

const Header = ({ project, handleOpenMembers, projectId }: Props) => {
  const [titleInput, setTitleInput] = useState(project?.title);
  const auth = useAuth();
  const { editMode, handleEditModeChange } = useEditProject();

  useEffect(() => {
    setTitleInput(project?.title);
  }, [project]);

  const handleTitleInput = (title: string) => {
    setTitleInput(title);
  };

  const submitNewTitle = async () => {
    const projectRef = doc(db, 'projects', projectId);

    try {
      await updateDoc(projectRef, {
        title: titleInput,
      });
    } catch (error) {
      console.error(error);
    }

    setTitleInput(project?.title);
    handleEditModeChange();
  };

  return (
    <header className={classes.header}>
      {editMode ? (
        <div className={classes.titleInput}>
          <input
            type='text'
            value={titleInput}
            onChange={(e) => handleTitleInput(e.target.value)}
          />
          <button>
            <RiArrowRightCircleFill onClick={submitNewTitle} />
          </button>
        </div>
      ) : (
        <h3 className={classes.name}>{project?.title}</h3>
      )}
      {auth?.user?.uid === project?.creator_uid && (
        <button
          className={classes.members}
          style={{ backgroundColor: `#${project?.color}` }}
          onClick={handleOpenMembers}
        >
          Manage members
        </button>
      )}
    </header>
  );
};

export default Header;
