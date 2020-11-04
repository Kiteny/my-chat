/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';
import UserApi from '../../../api/userApi';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    status: 'idle',
    error: null,
    isLoggedIn: !!UserApi.getRefreshToken(),
  },
  reducers: {
    writeUserData: (state, { payload }) => {
      state.status = 'success';
      state.error = null;
      state.userData = payload;
      state.isLoggedIn = true;
    },
    registration: (state) => {
      state.status = 'pending';
    },
    authorization: (state) => {
      state.status = 'pending';
    },
    fetchUserData: (state) => {
      state.status = 'pending';
    },
    logout: (state) => {
      state.userData = null;
      state.status = 'failure';
      state.error = { message: 'LOGOUT' };
      state.isLoggedIn = false;
    },
    writeError: (state, { error }) => {
      state.status = 'failure';
      state.userData = null;
      state.error = error;
      state.isLoggedIn = false;
    },
  },
});

export const { reducer, actions } = userSlice;

export const selectors = {
  selectUserError: (state) => state.user.error,
  selectUserStatus: (state) => state.user.status,
  selectUserLoggedIn: (state) => state.user.isLoggedIn,
};
