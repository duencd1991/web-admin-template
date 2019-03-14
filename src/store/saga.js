import { all } from 'redux-saga/effects';
import roomsSagas from './room/saga';
import algorithmSagas from './algorithm/saga';
import robotSagas from './robot/saga';

export default function* rootSaga() {
  yield all([roomsSagas(), algorithmSagas(), robotSagas()]);
}