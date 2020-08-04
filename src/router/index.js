import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from 'firebase'

Vue.use(VueRouter)

const requireAuth = true

const routerOptions = [
  { path: '/', name: 'Home', meta: { requireAuth } },
  { path: '/about', name: 'About' },
  { path: '/nueva/bitacora', name: 'NewBitacora', meta: { requireAuth } },
  { path: '/nueva/entrada', name: 'NewEntrada', meta: { requireAuth } },
  { path: '/entrada/:id', name: 'Entrada', meta: { requireAuth } },
  { path: '/bitacora/:id', name: 'Bitacora', meta: { requireAuth } },
  { path: '/login', name: 'Login' },
  { path: '/register', name: 'Register' },
  { path: '*', name: 'Error' }
]

const routes = routerOptions.map(r => {
  return {
    ...r,
    component: () => import(/* webpackChunkName: "[request]" */`@/views/${r.name}`)
  }
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requireAuth)) {
    auth().currentUser ? next() : next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
