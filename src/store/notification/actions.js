const actions = {
  NOTIFY_SUCCESS: 'NOTIFY_SUCCESS',
  NOTIFY_ERROR: 'NOTIFY_ERROR',
  NOTIFY_CLEAR: 'NOTIFY_CLEAR',
  NOTIFY_LOADING: 'NOTIFY_LOADING',

  success: message => ({
    type: actions.NOTIFY_SUCCESS,
    message
  }),
  error: error => ({
    type: actions.NOTIFY_ERROR,
    error
  }),
  clearNotify: () => ({
    type: actions.NOTIFY_CLEAR
  }),
  loading: () => ({
    type: actions.NOTIFY_LOADING
  })
};
export default actions;
