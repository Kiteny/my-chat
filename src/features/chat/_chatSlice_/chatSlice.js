/* eslint-disable import/prefer-default-export */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const chatEntity = createEntityAdapter({
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatEntity.getInitialState({ status: 'idle', error: null }),
  reducers: {
    subscribeNewMessages: (state) => {
      state.error = null;
      state.status = 'idle';
    },
    unsubscribeNewMessages: (state) => {
      chatEntity.removeAll(state);
    },
    sendMessage: (state) => {
      state.status = 'pending';
    },
    writeError: (state, { error }) => {
      state.status = 'failure';
      state.error = error;
    },
    writeMessages: (state, { payload }) => {
      state.status = 'success';
      state.error = null;
      chatEntity.addMany(state, payload);
    },
  },
});

const { selectEntities: selectChatEntities } = chatEntity.getSelectors((state) => state.chat);

export const selectors = {
  selectChatEntities,
};

export const { reducer, actions } = chatSlice;
