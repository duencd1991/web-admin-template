import request from '../utils/request';

const list = (searchKey, start, limit) => {
  let url = '';
  if (searchKey) {
    url = `/robot/algorithm/list?searchKey=${searchKey}&start=${start}&limit=${limit}`;
  } else {
    url = `/robot/algorithm/list?start=${start}&limit=${limit}`;
  }
  return request({
    url: url,
    method: 'get'
  });
};
const get = id => {
  return request({
    url: `/robot/algorithm/detail?id=${id}`,
    method: 'get'
  });
};
const create = (body) => {
  return request({
    url: `/robot/algorithm/create`,
    data: body,
    method: 'post'
  });
};
const update = (body) => {
  return request({
    url: `/robot/algorithm/update`,
    data: body,
    method: 'post'
  });
};
const changeStatus = (id, status) => {
  return request({
    url: `/robot/algorithm/changeStatus?id=${id}&status=${status}`,
    method: 'post'
  });
}
export { list, get, create, update, changeStatus };