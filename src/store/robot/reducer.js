import actions from './actions';

const initialState = {
  list: [],
  detail: {}
};

const Robots = (state = initialState, action) => {
  switch (action.type) {
    case actions.ROBOTS:
      return { ...state, list: action.list, total: action.total };
    case actions.ROBOT_DETAIL:
      return { ...state, detail: action.detail };
    default:
      return state;
  }
};

export default Robots;
