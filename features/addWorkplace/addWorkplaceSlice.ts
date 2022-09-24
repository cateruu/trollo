import { createSlice } from '@reduxjs/toolkit';

export type AddWorkspace = {
  isOpen: boolean;
};

const initialState: AddWorkspace = {
  isOpen: true,
};

export const addWorkspaceSlice = createSlice({
  name: 'addWorkspace',
  initialState,
  reducers: {
    openAddWorkspace: (state) => {
      state.isOpen = true;
    },
    closeAddWorkspace: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAddWorkspace, closeAddWorkspace } =
  addWorkspaceSlice.actions;
export default addWorkspaceSlice.reducer;
