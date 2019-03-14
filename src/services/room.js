import request from '../utils/request';

const list = () => {
  return request({
    url: '/room',
    method: 'get'
  });
};
const get = id => {
  return request({
    url: '/room/' + id,
    method: 'get'
  });
};
export { list, get };
