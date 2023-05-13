import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/Games',
    name: 'Game List',
    component: () => import( '../views/Game/GameListView.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import( '../views/User/UserLoginView.vue')
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: () => import( '../views/User/UserAddView.vue')
  },
  {
    path: '/User/:id/edit',
    name: 'Modify User',
    component: () => import( '../views/User/UserEditView.vue')
  },
  {
    path: '/Game/add',
    name: 'Add Game',
    component: () => import( '../views/Game/GameAddView.vue')
  },
  {
    path: '/Game/:id',
    name: 'Game Details',
    component: () => import( '../views/Game/GameView.vue')
  },
  {
    path: '/Game/:id/edit',
    name: 'Game edit',
    component: () => import( '../views/Game/GameEditView.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
