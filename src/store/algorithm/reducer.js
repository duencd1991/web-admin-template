import actions from './actions';

const initialState = {
  list: [],
  total: 0,
  detail: {}
};

const Algorithms = (state = initialState, action) => {
  switch (action.type) {
    case actions.ALGORITHMS:
      return { ...state, list: action.list, total: action.total };
    case actions.ALGORITHM_DETAIL:
      return { ...state, detail: action.detail };
    default:
      return state;
  }
};

export default Algorithms;
