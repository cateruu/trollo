import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

type OrderType = {
  lastCardInOrder: number;
};

const initialState: OrderType = {
  lastCardInOrder: 0,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLastCardOrder: (state, { payload }: PayloadAction<number>) => {
      state.lastCardInOrder = payload;
    },
  },
});

export const { setLastCardOrder } = orderSlice.actions;

export default orderSlice.reducer;
