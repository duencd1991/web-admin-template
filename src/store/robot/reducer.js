import actions from './actions';

const initialState = {
  list: [
    {
      id: 1,
      name: 'ROBOT 01',
      room: 'Room1',
      algorithms: [
        'AL 01',
        'AL 02'
      ],
      description: 'description abc',
      status: true,
      date: '09/10/2019',
    },
    {
      id: 2,
      name: 'ROBOT 02',
      room: 'Room2',
      algorithms: [
        'AL 11',
        'AL 22'
      ],
      description: 'description xyz',
      status: false,
      date: '09/10/2019',
    },
  ],
  detail: {},
  error: ''
};

const Robots = (state = initialState, action) => {
  switch (action.type) {
    case actions.ROBOTS:
      return { ...state, list: action.list };
    case actions.ROBOT_DETAIL:
      return { ...state, detail: action.detail };
    case actions.ROBOT_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default Robots;
