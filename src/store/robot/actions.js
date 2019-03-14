const actions = {
  ROBOTS: 'ROBOTS',
  ROBOT_LIST: 'ROBOT_LIST',
  ROBOT_CREATE: 'ROBOT_CREATE',
  ROBOT_DELETE: 'ROBOT_DELETE',
  ROBOT_GET: 'ROBOT_GET',
  ROBOT_DETAIL: 'ROBOT_DETAIL',
  ROBOT_UPDATE: 'ROBOT_UPDATE',
  ROBOT_ERROR: 'ROBOT_ERROR',
  list: () => ({
    type: actions.ROBOT_LIST
  }),
  detail: id => ({
    type: actions.ROBOT_DETAIL,
    id
  })
};
export default actions;
