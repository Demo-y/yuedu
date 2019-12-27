import Vue from 'vue'
import VueRouter from 'vue-router' 
import Content from '../views/Content' 
import Articles from '../views/Articles' 
Vue.use(VueRouter)
Vue.use(Content)
Vue.use(Articles)
const routes = [
  {
    path: '/', 
    alias:'/:id',
    name: 'Content',
    component: Content
  },
  {
    path: '/article/:id',
    name: 'articles',
    component:Articles
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next)=> {
  // console.log(to,from)
  // 判断路由符合路径条件则禁止跳转
  // if(to.path==='/park' || to.path==='/zoom' || to.path==='/zoom/tiger') {
  // 我们可以去验证要去的路由里边是否包含meta.auth
  // if(to.meta.auth){
  // 我们只要判断zoom或者zoom下边的子路由只要有一个有meta.auth,就允许进入
  // if(to.matched.some(route=> route.meta.auth)){
  //     if(localStorage.getItem('ticket')){
  //         next()
  //     }else {
  //         alert('去买票')
  //         next('/ticket?ReturnUrl='+to.path)
  //     }
  // }else {
      next()    // router.push() 下一步应该去哪里
  // }
})
export default router
