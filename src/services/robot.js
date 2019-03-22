import request from '../utils/request';

const list = (searchKey, start, limit) => {
  let url = '';
  if (searchKey) {
    url = `/robot/source/list?searchKey=${searchKey}&start=${start}&limit=${limit}`;
  } else {
    url = `/robot/source/list?start=${start}&limit=${limit}`;
  }
  return request({
    url: url,
    method: 'get'
  });
};
const get = id => {
  return request({
    url: `/robot/source/detail?roomId=${id}`,
    method: 'get'
  });
};
const create = (body) => {
  return request({
    url: `/robot/source/create`,
    data: body,
    method: 'post'
  });
};
const update = (body) => {
  return request({
    url: `/robot/source/update`,
    data: body,
    method: 'post'
  });
};
export { list, get, create, update };
