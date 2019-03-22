import actions from './actions';

const initialState = {
  list: [],
  detail: {}
};

const Rooms = (state = initialState, action) => {
  switch (action.type) {
    case actions.ROOMS:
      return { ...state, list: action.list, total: action.total };
    case actions.ROOM_DETAIL:
      return { ...state, detail: action.detail };
    default:
      return state;
  }
};

export default Rooms;
