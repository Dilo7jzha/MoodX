import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import GetHelpView from '../views/GetHelpView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/getHelp',
    name: 'Get Help',
    component: GetHelpView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router