import actions from './actions';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { list, get } from '../../services/room';

export function* robotList() {
  yield takeEvery(actions.ROBOT_LIST, function*() {
    try {
      const response = yield list();
      if (response.status === 200) {
        yield put({ type: actions.ROBOTS, list: response.data.data });
      }
    } catch (error) {
      yield put({ type: actions.ROBOT_ERROR, error: error.message });
    }
  });
}

export function* robotGet() {
  yield takeEvery(actions.ROBOT_GET, function*(data) {
    try {
      // get request
      const response = yield get(data.id);

      //handle request
      if (response.status === 200) {
        yield put({ type: actions.ROBOT_DETAIL, detail: response.data });
      }
    } catch (error) {
      yield put({ type: actions.ROBOT_ERROR, error: error.message });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(robotList), fork(robotGet)]);
}
