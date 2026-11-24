import request from '../axios.js'

export function login(data) {
  return request.post('/admin/login', data)
}

export function getInfo() {
  return request.post('/admin/getinfo')
}

export function logout() {
  return request.post('/admin/logout')
}

export function updatePassword(data) {
  return request.post('/admin/updatepassword', data)
}

export default {
  login,
  getInfo,
  logout,
  updatePassword
}