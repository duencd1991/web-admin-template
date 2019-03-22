const actions = {
  ROOMS: 'ROOMS',
  ROOM_LIST: 'ROOM_LIST',
  ROOM_CREATE: 'ROOM_CREATE',
  ROOM_DELETE: 'ROOM_DELETE',
  ROOM_GET: 'ROOM_GET',
  ROOM_DETAIL: 'ROOM_DETAIL',
  ROOM_UPDATE: 'ROOM_UPDATE',
  ROOM_CHANGE_STATUS: 'ROOM_CHANGE_STATUS',
  list: (searchKey, start, limit) => ({
    type: actions.ROOM_LIST,
    searchKey,
    start,
    limit
  }),
  get: id => ({
    type: actions.ROOM_GET,
    id
  }),
  create: body => ({
    type: actions.ROOM_CREATE,
    body
  }),
  update: body => ({
    type: actions.ROOM_UPDATE,
    body
  }),
  changeStatus: (id, status) => ({
    type: actions.ROOM_CHANGE_STATUS,
    id,
    status
  })
};
export default actions;
