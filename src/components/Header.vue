<script setup>
import { isAuthenticated } from '../router/index.js';
import { useRouter } from 'vue-router';
import { role } from '../router/index.js';
const router = useRouter()
const logout = () => {
  isAuthenticated.value = false,
    role.value = '',
    router.push({ name: 'Login' })
}
</script>

<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <h1 class="m-0">
        <a class="logo" href="/" aria-label="Home">MoodX</a>
      </h1>
      <div class="nav-container d-flex justify-content-center flex-grow-1">
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <a href="/getHelp" class="nav-link dropdown-toggle" id="getHelpDropdown" role="button"
              data-bs-toggle="dropdown" aria-label="Get help">
              Get help
            </a>
            <ul class="dropdown-menu" aria-labelledby="getHelpDropdown">
              <li><router-link to="/getHelp/supportResource" class="dropdown-item" aria-label="Support resource">Support
                  resource</router-link></li>
              <li><router-link to="/getHelp" class="dropdown-item" aria-label="Direct to clinic">Direct to
                  clinic</router-link></li>
              <li><router-link to="/getHelp/bookConsultation" class="dropdown-item" aria-label="Book Consultation">Book
                  Consultation</router-link></li>
              <li><router-link to="/getHelp/talkToChatbot" class="dropdown-item" aria-label="Talk to Chatbot">Talk to
                  Chatbot</router-link></li>
            </ul>
          </li>
          <li class="nav-item"><router-link to="/getInvolved" class="nav-link" aria-label="Get involved">Get
              involved</router-link></li>
          <li class="nav-item"><router-link to="/aboutUs" class="nav-link" aria-label="About us">About us</router-link>
          </li>
          <li class="nav-item" v-if="(role === 'admin')"><router-link to="/adminDashboard" class="nav-link"
              aria-label="Admin dashboard">Admin
              dashboard</router-link></li>
        </ul>
      </div>
      <div class="profile nav-item dropdown">
        <a href="/profile" class="nav-link dropdown-toggle" id="getHelpDropdown" role="button" data-bs-toggle="dropdown"
          aria-expanded="false" aria-label="Profile">
          <i class="fas fa-user-circle"></i>
        </a>
        <ul class="dropdown-menu" aria-labelledby="getHelpDropdown">
          <li><router-link to="/profile" class="dropdown-item" aria-label="Profile">Profile</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/login" class="dropdown-item"
              aria-label="Login">Login</router-link></li>
          <li v-else><router-link to="/login" class="dropdown-item disabled" aria-label="Login">Login</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/login" class="dropdown-item" @click="logout"
              aria-label="Logout">Logout</router-link>
          </li>
          <li v-else><router-link to="/login" class="dropdown-item disabled" @click="logout"
              aria-label="Logout">Logout</router-link></li>
        </ul>
      </div>
    </header>
  </div>
</template>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}

.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  color: #000000;
}

.nav-link:hover {
  color: #000000;
}

.nav-container {
  flex-grow: 1;
}

.nav-item.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
}

/* Profile icon styling */
.profile {
  font-size: 1.5rem;
  color: #000000;
  margin-left: auto;
}

.dropdown-item:hover {
  color: #007bff;
}
</style>