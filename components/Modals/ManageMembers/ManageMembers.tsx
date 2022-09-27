import { FormEvent, useState } from 'react';

import classes from './ManageMembers.module.scss';
import { RiArrowRightCircleFill } from 'react-icons/ri';
import { useAuth } from '../../../store/AuthContext';
import {
  arrayUnion,
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';

type Props = {
  members?: string[];
  handleOpenMembers: () => void;
  projectId: string;
};

const ManageMembers = ({ members, handleOpenMembers, projectId }: Props) => {
  const [memberInput, setMemberInput] = useState<string>('');
  const [membersData, setMembersData] = useState(members);

  const auth = useAuth();

  const handleMemberInput = (value: string) => {
    setMemberInput(value);
  };

  const handleMemberSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!memberInput) return;

    setMemberInput('');
    setMembersData((prevMembers) => {
      if (prevMembers) {
        if (prevMembers.includes(memberInput)) {
          return prevMembers;
        } else if (memberInput === auth?.user?.email) {
          console.error('cant share with myself!');
          return prevMembers;
        }

        return [...prevMembers, memberInput];
      }

      return [memberInput];
    });

    try {
      const q = query(
        collection(db, 'projects') as CollectionReference<Project>,
        where('id', '==', projectId)
      );
      const docRef = await getDocs(q);
      docRef.forEach((doc) => {
        updateDoc(doc.ref, {
          ...doc.data,
          shared_with: arrayUnion(memberInput),
        });
      });
    } catch (error) {}
  };

  return (
    <>
      <div className={classes.opacity} onClick={handleOpenMembers}></div>
      <div className={classes.container}>
        <h2 className={classes.header}>Add project</h2>
        <div className={classes.members}>
          {membersData?.map((member) => (
            <p key={member}>{member}</p>
          ))}
        </div>
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
      </div>
    </>
  );
};

export default ManageMembers;
