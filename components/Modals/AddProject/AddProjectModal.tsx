import { FormEvent, useState } from 'react';
import classes from './AddProjectModal.module.scss';

import { RiArrowRightCircleFill } from 'react-icons/ri';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../store/AuthContext';

type Props = {
  openAddProject: () => void;
};

type Details = {
  title: string;
  description: string;
  color: string;
};

const AddProjectModal = ({ openAddProject }: Props) => {
  const [details, setDetails] = useState<Details>({
    title: '',
    description: '',
    color: 'F07575',
  });
  const [memberInput, setMemberInput] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);
  const auth = useAuth();

  const handleDetailsChange = (value: string, object: string) => {
    setDetails((prevDetails) => ({ ...prevDetails, [object]: value }));
  };

  const handleDetailsSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!details) {
      openAddProject();
      return;
    }

    try {
      openAddProject();
      await addDoc(collection(db, 'projects'), {
        creator_uid: auth?.user?.uid,
        creator_email: auth?.user?.email,
        title: details.title,
        description: details.description,
        color: details.color,
        shared_with: members,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleMemberInput = (value: string) => {
    setMemberInput(value);
  };

  const handleMemberSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!memberInput) return;
    setMemberInput('');
    setMembers((prevMembers) => {
      if (prevMembers.includes(memberInput)) {
        return prevMembers;
      } else if (memberInput === auth?.user?.email) {
        console.error('cant share with myself!');
        return prevMembers;
      }

      return [...prevMembers, memberInput];
    });
  };

  return (
    <>
      <div className={classes.opacity} onClick={openAddProject}></div>
      <div className={classes.container}>
        <h2 className={classes.header}>Add project</h2>
        <form
          className={classes.form}
          id='details'
          onSubmit={handleDetailsSubmit}
        >
          <label htmlFor='title' className={classes.label}>
            Title
          </label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type='text'
              className={classes.input}
              id='title'
              value={details.title}
              onChange={(e) => handleDetailsChange(e.target.value, 'title')}
            />
            <select
              id='color'
              value={details.color}
              onChange={(e) => handleDetailsChange(e.target.value, 'color')}
              style={{
                backgroundColor: `#${details.color}`,
                marginBottom: '15px',
              }}
              className={classes.select}
            >
              <option value='F07575' style={{ backgroundColor: '#F07575' }} />
              <option value='75CBF0' style={{ backgroundColor: '#75CBF0' }} />
              <option value='8AE055' style={{ backgroundColor: '#8AE055' }} />
              <option value='AB75F0' style={{ backgroundColor: '#AB75F0' }} />
              <option value='F075DC' style={{ backgroundColor: '#F075DC' }} />
            </select>
          </div>
          <label htmlFor='description' className={classes.label}>
            Description
          </label>
          <input
            type='text'
            className={classes.input}
            id='description'
            value={details.description}
            onChange={(e) => handleDetailsChange(e.target.value, 'description')}
          />
        </form>
        <form className={classes.form} onSubmit={handleMemberSubmit}>
          <label htmlFor='members' className={classes.label}>
            Add member
          </label>
          <div className={classes.memberInput}>
            <input
              type='email'
              id='members'
              value={memberInput}
              onChange={(e) => handleMemberInput(e.target.value)}
            />
            <button>
              <RiArrowRightCircleFill />
            </button>
          </div>
        </form>
        {members && (
          <div className={classes.members}>
            {members.map((member) => {
              return <p key={member}>{member}</p>;
            })}
          </div>
        )}
        <div className={classes.buttons}>
          <button
            className={`${classes.button} ${classes.cancel}`}
            onClick={openAddProject}
          >
            Cancel
          </button>
          <button form='details' className={`${classes.button} ${classes.add}`}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProjectModal;
