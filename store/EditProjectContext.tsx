import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type EditType = {
  editMode: boolean;
  handleEditModeChange: () => void;
};

const EditProjectContext = createContext<EditType>({
  editMode: false,
  handleEditModeChange: () => {},
});

export const useEditProject = () => useContext(EditProjectContext);

export const EditProjectProvider = ({ children }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditModeChange = () => {
    setEditMode(!editMode);
  };

  const value: EditType = {
    editMode: editMode,
    handleEditModeChange: handleEditModeChange,
  };

  return (
    <EditProjectContext.Provider value={value}>
      {children}
    </EditProjectContext.Provider>
  );
};

export default EditProjectContext;
