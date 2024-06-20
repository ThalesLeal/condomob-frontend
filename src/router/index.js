import Vue from 'vue'
import VueRouter from 'vue-router'
import { isValidToken } from '@/services/auth.service'

Vue.use(VueRouter)

const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/SApp')

const routeOptions = [
  { path: 'arquivo', name: 'arquivo/ArquivoList' },
  { path: 'arquivo/cadastrar', name: 'arquivo/ArquivoCreate' },
]

const routes = routeOptions.map(route => {
  return {
    ...route,
    component: () => import(/* webpackChunkName: "[request]" */ `@/views/${route.name}`)
  }
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login')
    },
    {
      path: '/',
      component: Layout,
      children: routes
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('condomob@accessToken')
  const user = JSON.parse(localStorage.getItem('condomob@user'))
  const { authorize } = to.meta
  if (to.name !== 'Login' && !isValidToken(token)) { next({ name: 'Login' }) }
  else if (user && !user.is_superuser && authorize && !user.roles.includes(authorize)) {
    Vue.$toast.open({
      message: "Você não tem permissão para executar esta ação",
      type: "error",
    })
  }
  else next()
})

export default router