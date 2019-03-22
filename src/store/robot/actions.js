const actions = {
  ROBOTS: 'ROBOTS',
  ROBOT_LIST: 'ROBOT_LIST',
  ROBOT_CREATE: 'ROBOT_CREATE',
  ROBOT_DELETE: 'ROBOT_DELETE',
  ROBOT_GET: 'ROBOT_GET',
  ROBOT_DETAIL: 'ROBOT_DETAIL',
  ROBOT_UPDATE: 'ROBOT_UPDATE',
  ROBOT_ERROR: 'ROBOT_ERROR',
  list: (searchKey, start, limit) => ({
    type: actions.ROBOT_LIST,
    searchKey, start, limit
  }),
  get: id => ({
    type: actions.ROBOT_GET,
    id
  }),
  create: body => ({
    type: actions.ROBOT_CREATE,
    body
  }),
  update: body => ({
    type: actions.ROBOT_UPDATE,
    body
  })
};
export default actions;
