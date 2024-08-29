import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import GetHelpView from '../views/GetHelpView.vue'
import SupportResourceView from '../views/SupportResourceView.vue'
import BookConsultationView from '../views/BookConsultationView.vue'
import GetInvolvedView from '../views/GetInvolvedView.vue'
import AboutUsView from '../views/AboutUsView.vue'
import ProfileView from '../views/ProfileView.vue'

import {ref} from 'vue'

const isAuthenticated = ref(false)

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
  },
  {
    path: '/getHelp/supportResource',
    name: 'Support Resource',
    component: SupportResourceView
  },
  {
    path: '/getHelp/bookConsultation',
    name: 'Book Consultation',
    component: BookConsultationView
  },
  {
    path: '/getInvolved',
    name: 'Get Involved',
    component: GetInvolvedView
  },
  {
    path: '/aboutUs',
    name: 'About Us',
    component: AboutUsView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export {isAuthenticated}
export default router