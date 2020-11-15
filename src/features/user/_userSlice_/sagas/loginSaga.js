import {
  apply, fork, put, take,
} from 'redux-saga/effects';

import { actions } from '../userSlice';
import UserApi from '../../../../api/userApi';

const { writeError, fetchUserData } = actions;

export default function* loginSaga() {
  let isLoggedIn = !!UserApi.getRefreshToken();

  while (true) {
    if (!isLoggedIn) {
      const { payload } = yield take('user/authorization');
      yield fork(authorize, payload);
    } else {
      yield put(fetchUserData());
    }

    let action = yield take(['user/writeUserData', 'user/writeError']);

    if (action.type === 'user/writeUserData') {
      action = yield take('user/logout');
    }

    yield apply(UserApi, UserApi.setRefreshToken, ['']);

    isLoggedIn = false;
  }
}

function* authorize({ email, password }) {
  try {
    const regResponse = yield apply(UserApi, UserApi.signIn, [email, password]);
    const { refreshToken } = regResponse.data;

    UserApi.setRefreshToken(refreshToken);

    yield put(fetchUserData());
  } catch (e) {
    if (e.response) {
      const { error } = e.response.data;
      yield put({ ...writeError(), error });
    } else {
      throw e;
    }
  }
}
