import {
  apply, call, put, take,
} from 'redux-saga/effects';

import UserApi from '../../../../api/userApi';
import { actions } from '../userSlice';

const { writeUserData } = actions;

export default function* fetchUserDataSaga() {
  while (true) {
    yield take('user/fetchUserData');
    yield call(fetchUserData);
  }
}

function* fetchUserData() {
  const refreshToken = yield apply(UserApi, UserApi.getRefreshToken);
  const idToken = yield apply(UserApi, UserApi.getAccessToken, [refreshToken]);

  const userData = yield apply(UserApi, UserApi.getUserData, [idToken]);
  yield put(writeUserData(userData.data.users[0]));
}
