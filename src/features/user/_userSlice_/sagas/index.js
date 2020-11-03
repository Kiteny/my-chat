import { all } from 'redux-saga/effects';

import registrationSaga from './registrationSaga';
import loginSaga from './loginSaga';

export default function* rootUserSaga() {
  yield all([registrationSaga(), loginSaga()]);
}
