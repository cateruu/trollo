import { configureStore } from '@reduxjs/toolkit';
import addWorkspaceReducer from '../features/addWorkplace/addWorkplaceSlice';

export const store = configureStore({
  reducer: {
    addWorkspace: addWorkspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
