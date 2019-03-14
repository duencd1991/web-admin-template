import actions from './actions';

const initialState = {
  list: [
    {
      id: 1,
      name: 'Algorithm 01',
      code: 'AL01',
      description: 'description abc',
      status: true,
      date: '09/10/2019',
    },
    {
      id: 2,
      name: 'Algorithm 02',
      code: 'AL2',
      description: 'description xyz',
      status: false,
      date: '09/10/2019',
    },
  ],
  detail: {},
  error: ''
};

const Algorithms = (state = initialState, action) => {
  switch (action.type) {
    case actions.ALGORITHMS:
      return { ...state, list: action.list };
    case actions.ALGORITHM_DETAIL:
      return { ...state, detail: action.detail };
    case actions.ALGORITHM_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default Algorithms;
