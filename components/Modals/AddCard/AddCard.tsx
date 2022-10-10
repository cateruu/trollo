import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { FormEvent, useState } from 'react';
import { db } from '../../../config/firebase';
import classes from './AddCard.module.scss';

type Props = {
  handleAddCard: () => void;
  projectId: string;
};

type Details = {
  title: string;
  color: string;
};

const AddCard = ({ handleAddCard, projectId }: Props) => {
  const [details, setDetails] = useState<Details>({
    title: '',
    color: 'F07575',
  });

  const handleDetailsChange = (value: string, object: string) => {
    setDetails((prevDetails) => ({ ...prevDetails, [object]: value }));
  };

  const handleDetailsSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!details) {
      handleAddCard();
      return;
    }

    try {
      handleAddCard();
      await addDoc(collection(db, 'projects', projectId, 'cards'), {
        title: details.title,
        color: details.color,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={classes.opacity} onClick={handleAddCard}></div>
      <div className={classes.container}>
        <h2 className={classes.header}>Add card</h2>
        <form className={classes.form} onSubmit={handleDetailsSubmit} id='form'>
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
        </form>
        <div className={classes.buttons}>
          <button
            className={`${classes.button} ${classes.cancel}`}
            onClick={handleAddCard}
          >
            Cancel
          </button>
          <button className={`${classes.button} ${classes.add}`} form='form'>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCard;
