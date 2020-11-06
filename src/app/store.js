import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { spawn } from 'redux-saga/effects';

import { userReducer, rootUserSaga } from '../features/user';
import { roomsReducer, rootRoomsSaga } from '../features/rooms';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    user: userReducer,
    rooms: roomsReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(function* root() {
  yield spawn(rootUserSaga);
  yield spawn(rootRoomsSaga);
});
