import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import index from '~/pages/index.vue'
import about from '~/pages/about.vue'
import notFound from '~/pages/404.vue'
import login from '~/pages/login.vue'
import testcookies from '~/pages/testcookies.vue'
import admin from '~/layouts/admin.vue'
import list from '~/pages/goods/list.vue'
import categorylist from '~/pages/category/list.vue'
import UserList from '~/pages/user/list.vue'
import OrderList from '~/pages/order/list.vue'
import CommentList from '~/pages/comment/list.vue'
import ImageList from '~/pages/image/list.vue'
import NoticeList from '~/pages/notice/list.vue'
import SettingBase from '~/pages/setting/base.vue'
import CouponList from '~/pages/coupon/list.vue'



const routes = [
  {
    path: '/',
    component: admin,
    children: [
      { path: '/', component: index, meta: { title: '首页' } },
      { path: '/goods/list', component: list, meta: { title: '商品管理' } },
      { path: '/category/list', component: categorylist, meta: { title: '分类管理' } }
      , {
        path: "/user/list",
        name: "/user/list",
        component: UserList,
        meta: {
          title: "用户列表"
        }
      }, {
        path: "/order/list",
        name: "/order/list",
        component: OrderList,
        meta: {
          title: "订单列表"
        }
      }, {
        path: "/comment/list",
        name: "/comment/list",
        component: CommentList,
        meta: {
          title: "评价列表"
        }
      }, {
        path: "/image/list",
        name: "/image/list",
        component: ImageList,
        meta: {
          title: "图库列表"
        }
      }, {
        path: "/notice/list",
        name: "/notice/list",
        component: NoticeList,
        meta: {
          title: "公告列表"
        }
      }, {
        path: "/setting/base",
        name: "/setting/base",
        component: SettingBase,
        meta: {
          title: "配置"
        }
      }, {
        path: "/coupon/list",
        name: "/coupon/list",
        component: CouponList,
        meta: {
          title: "优惠券列表"
        }
      }


    ],
    meta: { title: '首页' }
  },
  { path: '/about', component: about, meta: { title: '关于' } },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: notFound, meta: { title: '404' } }
  , { path: '/login', component: login, meta: { title: '登录' } }
  , { path: '/testcookies', component: testcookies, meta: { title: '测试cookies' } }
]



const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router