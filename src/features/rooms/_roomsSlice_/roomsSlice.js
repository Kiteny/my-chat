import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const roomsEntity = createEntityAdapter();

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: roomsEntity.getInitialState({ status: 'idle', error: null }),
  reducers: {
    writeRoomsData: (state, payload) => {
      roomsEntity.upsertMany(state, payload);
      state.status = 'success';
      state.error = null;
    },
    fetchRooms: (state) => {
      state.status = 'pending';
    },
    writeError: (state, { error }) => {
      state.status = 'failure';
      roomsEntity.removeAll(state);
      state.error = error;
    },
  },
});

export const { actions, reducer } = roomsSlice;

const {
  selectEntities: selectRoomsEntities,
  selectIds: selectRoomsIds,
  selectById: selectRoomById,
} = roomsEntity.getSelectors((state) => state.rooms);

export const selectors = {
  selectRoomsEntities,
  selectRoomsIds,
  selectRoomById,
  selectRoomsStatus: (state) => state.rooms.status,
};
