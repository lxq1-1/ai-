import router from '~/router'
import { getToken } from '~/composables/auth.js'
import { toast, showFullLoading, hideFullLoading } from '~/composables/util.js'
import store from '~/store/index.js'

//全局前置守卫
//第三个参数可选next
/**
 * to:要进入的目标路由对象
 * from:从哪里来的路由对象
 * next:放行函数
 */
 let hasUserInfo=false;


router.beforeEach(async (to, from, next) => {
  showFullLoading()
  const token = getToken()
  if (!token && to.path !== '/login') {
    toast('请先登录', 'error')
    return next({ path: '/login' })
  }

  if (token && to.path === '/login') {
    toast('请勿重复登录', 'error')
    return next({ path: from.path ? from.path : '/' })
  }
  if (token) {
    try {
      await store.dispatch('getinfo')
    } catch (e) {
      store.dispatch('logout').finally(() => {
        next({ path: '/login' })
      })
      return
    }
  }
//如果用户登录，自动获取用户信息，自动存放的到vuex当中
  if(token && !hasUserInfo){
      /*因为getInfo是异步的，所以要使用await，而这里发送异步请求，在当前代码块方法上面要用 asyn
      await 只能在 async 函数内部使用。 它会暂停 async 函数的执行，直到右侧的 Promise 被解决（resolve）或拒绝（reject）。
      如果 Promise 成功解决，await 返回其结果；如果失败，则抛出异常。 
      store.dispatch('getinfo') 是一个返回 Promise 的异步操作（例如从服务器获取用户信息）。
      使用 await 等待这个 Promise 完成，确保用户信息获取完成后才继续执行后续逻辑（如放行路由）。
      由于使用了 await，包含它的函数必须标记为 async —— 所以 router.beforeEach() 回调函数被声明为 async (to, from, next) => { ... }。
      */
      //每次后获取最新的用户数据放x到vuex中
      console.log('getinfo');
      await store.dispatch('getinfo'); 
      hasUserInfo=true;
  } 

  let title = to.meta.title
  document.title = title ? title : "电商后台管理系统"
  next()
})

router.afterEach((to, from) => {
  hideFullLoading()
})