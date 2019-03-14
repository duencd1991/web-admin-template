const actions = {
  ROOMS: 'ROOMS',
  ROOM_LIST: 'ROOM_LIST',
  ROOM_CREATE: 'ROOM_CREATE',
  ROOM_DELETE: 'ROOM_DELETE',
  ROOM_GET: 'ROOM_GET',
  ROOM_DETAIL: 'ROOM_DETAIL',
  ROOM_UPDATE: 'ROOM_UPDATE',
  ROOM_ERROR: 'ROOM_ERROR',
  list: () => ({
    type: actions.ROOM_LIST
  }),
  detail: id => ({
    type: actions.ROOM_DETAIL,
    id
  })
};
export default actions;
