import {
  apply, cancel, fork, put, take,
} from 'redux-saga/effects';

import { actions } from '../userSlice';
import UserApi from '../../../../api/userApi';

const { writeUserData, writeError } = actions;

export default function* loginSaga() {
  while (true) {
    const { payload } = yield take('user/authorization');

    const task = yield fork(authorize, payload);
    let action = yield take(['user/writeUserData', 'user/writeError']);

    if (action.type === 'user/writeUserData') {
      action = yield take('user/logout');
    }

    if (action.type === 'user/logout') {
      yield cancel(task);
    }
    yield apply(UserApi, UserApi.setRefreshToken, ['']);
  }
}

function* authorize({ email, password }) {
  try {
    const regResponse = yield apply(UserApi, UserApi.signIn, [email, password]);
    const { idToken, refreshToken } = regResponse.data;

    UserApi.setRefreshToken(refreshToken);

    const userData = yield apply(UserApi, UserApi.getUserData, [idToken]);
    yield put(writeUserData(userData.data.users[0]));
  } catch (e) {
    const { error } = e.response.data;
    yield put({ ...writeError(), error });
  }
}
