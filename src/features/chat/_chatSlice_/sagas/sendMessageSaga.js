import {
  apply, put, select, takeEvery,
} from 'redux-saga/effects';

import ChatApi from '../../../../api/chatApi';
import UserApi from '../../../../api/userApi';
import { userSelectors } from '../../../user';
import { actions } from '../chatSlice';

const { selectUserData } = userSelectors;
const { writeError } = actions;

export default function* sendMessageSaga() {
  yield takeEvery('chat/sendMessage', sendMessage);
}

function* sendMessage({ payload }) {
  try {
    const { displayName } = yield select(selectUserData);
    const { chatId, message } = payload;

    const accessToken = yield apply(UserApi, UserApi.getAccessToken);

    yield apply(ChatApi, ChatApi.sendMessage, [accessToken, displayName, chatId, message]);
  } catch (e) {
    if (e.isAxiosError) {
      const { error } = e.response.data;
      yield put({ ...writeError(), error });
    } else {
      throw e;
    }
  }
}
