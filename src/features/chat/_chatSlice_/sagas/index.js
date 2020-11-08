import { all } from 'redux-saga/effects';
import sendMessageSaga from './sendMessageSaga';
import subscribeNewMessagesSaga from './subscribeNewMessagesSaga';

export default function* rootRoomsSaga() {
  yield all([sendMessageSaga(), subscribeNewMessagesSaga()]);
}
