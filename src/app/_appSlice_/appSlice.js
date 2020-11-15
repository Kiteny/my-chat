/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    criticalError: null,
  },
  reducers: {
    criticalError(state, { error }) {
      state.criticalError = error.stack;
    },
  },
});

export const { reducer, actions } = appSlice;
