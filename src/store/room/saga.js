import actions from './actions';
import notifyActions from '../notification/actions';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { list, get, create, update, changeStatus } from '../../services/room';

export function* roomsList(data) {
  yield takeEvery(actions.ROOM_LIST, function*(data) {
    try {
      yield put({ type: notifyActions.NOTIFY_LOADING });

      const response = yield list(data.searchKey, data.start, data.limit);
      if (response.status === 200) {
        yield put({ type: actions.ROOMS, list: response.data.list, total: response.data.total });
      }

      yield put({ type: notifyActions.NOTIFY_LOADING });
    } catch (error) {
      yield put({ type: notifyActions.NOTIFY_ERROR, error: error.message });
    }
  });
}

export function* roomsGet() {
  yield takeEvery(actions.ROOM_GET, function*(data) {
    try {
      yield put({ type: notifyActions.NOTIFY_LOADING });

      const response = yield get(data.id);
      if (response.status === 200) {
        yield put({ type: actions.ROOM_DETAIL, detail: response.data.data });
      }

      yield put({ type: notifyActions.NOTIFY_LOADING });
    } catch (error) {
      yield put({ type: notifyActions.NOTIFY_ERROR, error: error.message });
    }
  });
}

export function* roomCreate(data) {
  yield takeEvery(actions.ROOM_CREATE, function* (data) {
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
export function* roomUpdate(data) {
  yield takeEvery(actions.ROOM_UPDATE, function* (data) {
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
export function* roomChangeStatus(data) {
  yield takeEvery(actions.ROOM_CHANGE_STATUS, function* (data) {
    try {
      yield put({ type: notifyActions.NOTIFY_LOADING });

      const response = yield changeStatus(data.id, data.status);
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
  yield all([fork(roomsList), fork(roomsGet), fork(roomCreate), fork(roomUpdate), fork(roomChangeStatus)]);
}
