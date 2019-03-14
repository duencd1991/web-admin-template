import actions from './actions';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { list, get } from '../../services/room';

export function* roomsList() {
  yield takeEvery(actions.ROOM_LIST, function*() {
    try {
      const response = yield list();
      if (response.status === 200) {
        yield put({ type: actions.ROOM, list: response.data.data });
      }
    } catch (error) {
      yield put({ type: actions.ROOM_ERROR, error: error.message });
    }
  });
}

export function* roomsGet() {
  yield takeEvery(actions.ROOM_GET, function*(data) {
    try {
      // get request
      const response = yield get(data.id);

      //handle request
      if (response.status === 200) {
        yield put({ type: actions.ROOM_DETAIL, detail: response.data });
      }
    } catch (error) {
      yield put({ type: actions.ROOM_ERROR, error: error.message });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(roomsList), fork(roomsGet)]);
}
