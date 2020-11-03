/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    writeUserData: (state, { payload }) => {
      state.status = 'success';
      state.error = null;
      state.userData = payload;
    },
    registration: (state) => {
      state.status = 'pending';
    },
    authorization: (state) => {
      state.status = 'pending';
    },
    logout: (state) => {
      state.userData = null;
      state.status = 'failure';
      state.error = { message: 'LOGOUT' };
    },
    writeError: (state, { error }) => {
      state.status = 'failure';
      state.userData = null;
      state.error = error;
    },
  },
});

export const { reducer, actions } = userSlice;

export const selectors = {
  selectUserError: (state) => state.user.error,
};
