import { all } from 'redux-saga/effects';
import fetchRoomsSaga from './fetchRoomsSaga';

export default function* rootRoomsSaga() {
  yield all([fetchRoomsSaga()]);
}
