import { FormEvent, useState } from 'react';

import classes from './ManageMembers.module.scss';
import { RiArrowRightCircleFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuth } from '../../../store/AuthContext';
import {
  arrayRemove,
  arrayUnion,
  collection,
  CollectionReference,
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
    } catch (error) {
      console.error(error);
    }
  };

  const removeMember = async (member: string) => {
    setMembersData((prevMembers) => {
      const temp: string[] = [];
      prevMembers?.forEach((data) => {
        if (data === member) return;

        temp.push(data);
      });

      return temp;
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
          shared_with: arrayRemove(member),
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={classes.opacity} onClick={handleOpenMembers}></div>
      <div className={classes.container}>
        <h2 className={classes.header}>Manage members</h2>
        <div className={classes.members}>
          {membersData?.map((member) => (
            <div key={member} className={classes.member}>
              <div
                className={classes.remove}
                onClick={() => removeMember(member)}
              >
                <AiOutlineClose />
              </div>
              {member}
            </div>
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
        <button className={classes.exit} onClick={handleOpenMembers}>
          Close
        </button>
      </div>
    </>
  );
};

export default ManageMembers;
