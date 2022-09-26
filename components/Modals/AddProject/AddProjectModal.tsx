import { FormEvent, useState } from 'react';
import classes from './AddProjectModal.module.scss';

import { RiArrowRightCircleFill } from 'react-icons/ri';

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

  const handleChange = (value: string, object: string) => {
    setDetails((prevDetails) => ({ ...prevDetails, [object]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!details) {
      openAddProject();
      return;
    }
  };

  return (
    <>
      <div className={classes.opacity} onClick={openAddProject}></div>
      <div className={classes.container}>
        <h2 className={classes.header}>Add project</h2>
        <form className={classes.form} id='details' onSubmit={handleSubmit}>
          <label htmlFor='title' className={classes.label}>
            Title
          </label>
          <div>
            <input
              type='text'
              className={classes.input}
              id='title'
              value={details.title}
              onChange={(e) => handleChange(e.target.value, 'title')}
            />
            <select
              id='color'
              value={details.color}
              onChange={(e) => handleChange(e.target.value, 'color')}
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
            onChange={(e) => handleChange(e.target.value, 'description')}
          />
        </form>
        <form className={classes.form}>
          <label htmlFor='members' className={classes.label}>
            Add members
          </label>
          <div className={classes.member}>
            <input type='email' id='members' />
            <button>
              <RiArrowRightCircleFill />
            </button>
          </div>
        </form>
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
