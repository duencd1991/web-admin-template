const actions = {
  ALGORITHMS: 'ALGORITHMS',
  ALGORITHM_LIST: 'ALGORITHM_LIST',
  ALGORITHM_GET: 'ALGORITHM_GET',
  ALGORITHM_DETAIL: 'ALGORITHM_DETAIL',
  ALGORITHM_CREATE: 'ALGORITHM_CREATE',
  ALGORITHM_UPDATE: 'ALGORITHM_UPDATE',
  ALGORITHM_DELETE: 'ALGORITHM_DELETE',
  ALGORITHM_CHANGE_STATUS: 'ALGORITHM_CHANGE_STATUS',
  list: (searchKey, start, limit) => ({
    type: actions.ALGORITHM_LIST,
    searchKey,
    start,
    limit
  }),
  get: id => ({
    type: actions.ALGORITHM_GET,
    id
  }),
  create: body => ({
    type: actions.ALGORITHM_CREATE,
    body
  }),
  update: body => ({
    type: actions.ALGORITHM_UPDATE,
    body
  }),
  changeStatus: (id, status) => ({
    type: actions.ALGORITHM_CHANGE_STATUS,
    id,
    status
  })
};
export default actions;
