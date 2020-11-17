import {
  apply, put, take, call,
} from 'redux-saga/effects';

import { actions } from '../userSlice';
import UserApi from '../../../../api/userApi';

const { writeError, fetchUserData } = actions;

export default function* registrationSaga() {
  while (true) {
    const { payload } = yield take('user/registration');
    yield call(registration, payload);
  }
}

function* registration({ email, password, username }) {
  try {
    const regResponse = yield apply(UserApi, UserApi.signUp, [email, password]);
    const { idToken, refreshToken } = regResponse.data;

    UserApi.setRefreshToken(refreshToken);

    yield apply(UserApi, UserApi.updateProfile, [idToken, username]);

    yield put(fetchUserData());
  } catch (e) {
    if (e.isAxiosError) {
      const { error } = e.response.data;
      yield put({ ...writeError(), error });
    } else {
      throw e;
    }
  }
}
