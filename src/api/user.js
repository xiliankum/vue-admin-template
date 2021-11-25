import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取路由列表
export function getRole() {
  return request({
    url: '/user/role',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
