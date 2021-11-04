export default [
  {
    path: '/welcome',
    component: 'Layout',
    redirect: '/welcome/index',
    meta: { title: 'Welcome', icon: 'example' },
    children: [
      {
        path: '/welcome/index',
        name: 'Welcome',
        component: '/welcome/index',
        meta: { title: '欢迎首页' }
      }
    ]
  },
  {
    path: '/commodity',
    component: 'Layout',
    redirect: '/commodity/index',
    meta: { title: 'commodity', icon: 'example' },
    children: [
      {
        path: '/commodity/index',
        name: 'commodity',
        component: '/commodity/index',
        meta: { title: '商品管理' }
      }
    ]
  },
  {
    path: '/order',
    component: 'Layout',
    redirect: '/order/index',
    meta: { title: 'order', icon: 'table' },
    children: [
      {
        path: '/order/index',
        name: 'order',
        component: '/order/index',
        meta: { title: '订单管理' }
      }
    ]
  },
  {
    path: '/user',
    component: 'Layout',
    redirect: '/user/index',
    meta: { title: 'user', icon: 'table' },
    children: [
      {
        path: '/user/index',
        name: 'user',
        component: '/user/index',
        meta: { title: '用户管理' }
      }
    ]
  },
  {
    path: '/customer',
    component: 'Layout',
    redirect: '/customer/index',
    meta: { title: 'customer', icon: 'table' },
    children: [
      {
        path: '/customer/index',
        name: 'customer',
        component: '/customer/index',
        meta: { title: '客户管理' }
      }
    ]
  },
  {
    path: '/menu',
    component: 'Layout',
    redirect: '/menu/index',
    meta: { title: 'menu', icon: 'table' },
    children: [
      {
        path: '/menu/index',
        name: 'menu',
        component: '/menu/index',
        meta: { title: '菜单管理' }
      }
    ]
  }
]
