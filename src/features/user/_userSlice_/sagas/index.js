import { all } from 'redux-saga/effects';

import registrationSaga from './registrationSaga';
import loginSaga from './loginSaga';
import fetchUserDataSaga from './fetchUserDataSaga';

export default function* rootUserSaga() {
  yield all([registrationSaga(), loginSaga(), fetchUserDataSaga()]);
}
