import actions from './actions';

const initialState = {
  list: [
    {
      id: 1,
      name: 'Room skype',
      code: 'ROOM1',
      type: 'skype',
      description: 'description abc',
      status: true,
      date: '09/10/2019',
    },
    {
      id: 2,
      name: 'Room telegram',
      code: 'ROOM2',
      type: 'telegram',
      description: 'description xyz',
      status: false,
      date: '09/10/2019',
    },
    {
      id: 3,
      name: 'Room skype',
      code: 'ROOM3',
      type: 'skype',
      description: 'description abc',
      status: true,
      date: '09/10/2019',
    },
    {
      id: 4,
      name: 'Room telegram',
      code: 'ROOM4',
      type: 'telegram',
      description: 'description xyz',
      status: false,
      date: '09/10/2019',
    },
    {
      id: 5,
      name: 'Room skype',
      code: 'ROOM5',
      type: 'skype',
      description: 'description abc',
      status: true,
      date: '09/10/2019',
    },
    {
      id: 6,
      name: 'Room telegram',
      code: 'ROOM6',
      type: 'telegram',
      description: 'description xyz',
      status: false,
      date: '09/10/2019',
    },
    {
      id: 7,
      name: 'Room skype',
      code: 'ROOM7',
      type: 'skype',
      description: 'description abc',
      status: true,
      date: '09/10/2019',
    },
    {
      id: 8,
      name: 'Room telegram',
      code: 'ROOM8',
      type: 'telegram',
      description: 'description xyz',
      status: false,
      date: '09/10/2019',
    }
  ],
  detail: {},
  error: ''
};

const Rooms = (state = initialState, action) => {
  switch (action.type) {
    case actions.ROOMS:
      return { ...state, list: action.list };
    case actions.ROOM_DETAIL:
      return { ...state, detail: action.detail };
    case actions.ROOM_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default Rooms;
