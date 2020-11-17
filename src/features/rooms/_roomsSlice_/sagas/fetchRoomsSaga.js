import { apply, put, takeLatest } from 'redux-saga/effects';

import RoomsApi from '../../../../api/roomsApi';
import UserApi from '../../../../api/userApi';
import { actions } from '../roomsSlice';

const { writeError, writeRoomsData } = actions;

export default function* fetchRoomsSaga() {
  yield takeLatest('rooms/fetchRooms', fetchRooms);
}

function* fetchRooms() {
  try {
    const refreshToken = yield apply(UserApi, UserApi.getRefreshToken);
    const idToken = yield apply(UserApi, UserApi.getAccessToken, [refreshToken]);

    const roomsData = yield apply(RoomsApi, RoomsApi.getRooms, [idToken]);

    const transformedRoomsData = Object.keys(roomsData).map((key) => ({
      id: key,
      ...roomsData[key],
    }));

    yield put(writeRoomsData(transformedRoomsData));
  } catch (e) {
    if (e.isAxiosError) {
      const { error } = e.response.data;
      yield put({ ...writeError(), error });
    } else {
      throw e;
    }
  }
}
