import actions from './actions';

const initialState = {
  error: '',
  message: '',
  loading: false
};

const Notifys = (state = initialState, action) => {
  switch (action.type) {
    case actions.NOTIFY_SUCCESS:
      return { ...state, message: action.message };
    case actions.NOTIFY_ERROR:
      return { ...state, error: action.error };
    case actions.NOTIFY_CLEAR:
      return { ...state, error: '', message: '' };
    case actions.NOTIFY_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

export default Notifys;
