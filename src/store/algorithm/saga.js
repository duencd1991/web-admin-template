import actions from './actions';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { list, get } from '../../services/room';

export function* algorithmList() {
  yield takeEvery(actions.ALGORITHM_LIST, function*() {
    try {
      const response = yield list();
      if (response.status === 200) {
        yield put({ type: actions.ALGORITHMS, list: response.data.data });
      }
    } catch (error) {
      yield put({ type: actions.ALGORITHM_ERROR, error: error.message });
    }
  });
}

export function* algorithmGet() {
  yield takeEvery(actions.ALGORITHM_GET, function*(data) {
    try {
      // get request
      const response = yield get(data.id);

      //handle request
      if (response.status === 200) {
        yield put({ type: actions.ALGORITHM_DETAIL, detail: response.data });
      }
    } catch (error) {
      yield put({ type: actions.ALGORITHM_ERROR, error: error.message });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(algorithmList), fork(algorithmGet)]);
}
