import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
const detail = () => import('@/pages/detail');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path: '/detail',
          name: 'detail',
          component: detail
        }
      ]
    },
  ]
})
