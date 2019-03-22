import actions from './actions';
import notifyActions from '../notification/actions';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { list, get, create, update } from '../../services/robot';

export function* robotList(data) {
  yield takeEvery(actions.ROBOT_LIST, function*(data) {
    try {
      yield put({ type: notifyActions.NOTIFY_LOADING });

      const response = yield list(data.searchKey, data.start, data.limit);
      if (response.status === 200) {
        yield put({ type: actions.ROBOTS, list: response.data.list, total: response.data.total });
      }

      yield put({ type: notifyActions.NOTIFY_LOADING });
    } catch (error) {
      yield put({ type: notifyActions.NOTIFY_ERROR, error: error.message });
    }
  });
}

export function* robotGet(data) {
  yield takeEvery(actions.ROBOT_GET, function*(data) {
    try {
      yield put({ type: notifyActions.NOTIFY_LOADING });

      const response = yield get(data.id);
      if (response.status === 200) {
        yield put({ type: actions.ROBOT_DETAIL, detail: response.data.data });
      }
    } catch (error) {
      yield put({ type: notifyActions.NOTIFY_ERROR, error: error.message });
    }

    yield put({ type: notifyActions.NOTIFY_LOADING });
  });
}
export function* robotCreate(data) {
  yield takeEvery(actions.ROBOT_CREATE, function* (data) {
    try {
      yield put({ type: notifyActions.NOTIFY_LOADING });

      const response = yield create(data.body);
      if (response.status === 200) {
        if (response.data.statusCode === 1) {
          yield put({ type: notifyActions.NOTIFY_SUCCESS, message: response.data.message });
        } else {
          yield put({ type: notifyActions.NOTIFY_ERROR, error: response.data.message });
        }
      }

      yield put({ type: notifyActions.NOTIFY_LOADING });
    } catch (error) {
      yield put({ type: notifyActions.NOTIFY_ERROR, error: error.message });
    }
  });
}
export function* robotUpdate(data) {
  yield takeEvery(actions.ROBOT_UPDATE, function* (data) {
    try {
      yield put({ type: notifyActions.NOTIFY_LOADING });

      const response = yield update(data.body);
      if (response.status === 200) {
        if (response.data.statusCode === 1) {
          yield put({ type: notifyActions.NOTIFY_SUCCESS, message: response.data.message });
        } else {
          yield put({ type: notifyActions.NOTIFY_ERROR, error: response.data.message });
        }
      }

      yield put({ type: notifyActions.NOTIFY_LOADING });
    } catch (error) {
      yield put({ type: notifyActions.NOTIFY_ERROR, error: error.message });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(robotList), fork(robotGet), fork(robotCreate), fork(robotUpdate)]);
}
