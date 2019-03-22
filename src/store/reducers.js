import { combineReducers } from 'redux';

import Algorithms from './algorithm/reducer';
import Rooms from './room/reducer';
import Robots from './robot/reducer';
import Header from './header/reducer';
import Notifys from './notification/reducer';

const reducers = combineReducers({
  Algorithms,
  Rooms,
  Robots,
  Header,
  Notifys
});

export default reducers;