import { eventChannel } from 'redux-saga';
import {
  apply,
  call, fork, put, take,
} from 'redux-saga/effects';

import ChatApi from '../../../../api/chatApi';
import UserApi from '../../../../api/userApi';

import { actions } from '../chatSlice';

const { writeError, writeMessages } = actions;

export default function* subscribeNewMessagesSaga() {
  while (true) {
    const { payload: chatId } = yield take('chat/subscribeNewMessages');
    yield call(subscribeNewMessages, chatId);
  }
}

function* subscribeNewMessages(chatId) {
  try {
    const accessToken = yield apply(UserApi, UserApi.getAccessToken);
    const chan = yield call(subscribe, chatId, accessToken);

    yield fork(unsubscribe, chan);

    while (true) {
      const newMessages = yield take(chan);
      yield put(writeMessages(newMessages));
    }
  } catch (e) {
    if (e.isAxiosError) {
      const { error } = e.response.data;
      yield put({ ...writeError(), error });
    } else {
      throw e;
    }
  }
}

function subscribe(chatId, accessToken) {
  return eventChannel((emmiter) => {
    const cancelSubscribe = ChatApi.subscribeNewMessages(
      accessToken,
      chatId,
      (data) => emmiter(data),
    );

    return cancelSubscribe;
  });
}

function* unsubscribe(chan) {
  yield take('chat/unsubscribeNewMessages');
  chan.close();
}
