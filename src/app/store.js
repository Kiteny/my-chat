import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, put } from 'redux-saga/effects';

import { appReducer } from './_appSlice_';
import { userReducer, rootUserSaga } from '../features/user';
import { roomsReducer, rootRoomsSaga } from '../features/rooms';
import { chatReducer, chatRootSaga } from '../features/chat';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    rooms: roomsReducer,
    chat: chatReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(function* root() {
  try {
    yield all([
      rootUserSaga(),
      rootRoomsSaga(),
      chatRootSaga(),
    ]);
  } catch (e) {
    yield put({ type: 'app/criticalError', error: e });
  }
});
