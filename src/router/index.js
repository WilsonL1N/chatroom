import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import SignIn from '../components/signIn/SignIn.vue'
import SignUp from '../components/signUp/SignUp.vue'
import waitingRoom from '../components/waitingRoom/waitingRoom.vue'
import chatRoom from '../components/chatRoom/chatRoom.vue'

const routes = [
  {
    path: '/',
    redirect: () => {
      return { path: '/signin'}
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/waitingRoom',
    name: 'waitingRoom',
    component: waitingRoom
  },
  {
    path: '/chatRoom/:roomId',
    name: 'chatRoom',
    component: chatRoom
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
