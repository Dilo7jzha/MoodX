<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import { role as identity } from '../router/index.js'; //there's already a role const in registration
import { isAuthenticated } from '../router/index.js';
import DatePicker from 'primevue/datepicker';

import { ref } from 'vue'

const formData = ref({
    email: '',
    username: '',
    password: '',
    birth: null,
})

const clearForm = () => {
    formData.value = {
        email: '',
        username: '',
        password: '',
        birth: null,
    }
}
const submitForm = () => {
    const email = formData.value.email;
    const password = formData.value.password;
    //get user info from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    //identify if submited user email exists
    const isExist = users.some(user => user.email === email)//return true if at least one matches, otherwise false
    if (isExist) {
        alert("The email has already been registered")
        clearForm()
    } else {
        const role = email.toLowerCase().includes('admin') ? 'admin' : 'users'
        users.push({
            email: email,
            password: password,
            role: role
        })
        //store to local storage
        localStorage.setItem('users', JSON.stringify(users))
        alert("Success")
        clearForm()
        isAuthenticated.value = true
        identity.value = role
        router.push({ name: 'Home' })
    }
}
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center logo">MoodX</h1>
                <p class="text-center">
                    Create your account
                </p>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 col-6">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter your email address"
                                v-model="formData.email" />
                        </div>
                        <div class="col-md-6 col-sm-6 col-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" placeholder="Enter your username"
                                v-model="formData.username" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 col-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter your password"
                                v-model="formData.password" />
                        </div>
                        <div class="col-md-6 col-sm-6 col-6">
                            <label for="confirm-password" class="form-label">Confirm password</label>
                            <input type="password" class="form-control" id="confirm-password"
                                placeholder="Confirm your password" v-model="formData.confirmPassword" />
                        </div>
                    </div>
                    <div class="row mb-3 justify-content-center">
                        <div class="col-md-6 col-sm-6 col-6">
                            <label for="birth" class="form-label">Date of birth</label>
                            <input type="date" class="form-control" v-model="formData.dateOfBirth" dateFormat="dd/mm/yy"
                                id="birth" />
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2 mb-3">Sign Up</button>
                        <button type="button" class="btn btn-secondary me-2 mb-3" @click="clearForm">Clear</button>
                        <p class="mb-3">Already have an account?</p>
                        <router-link to="/login" class="mb-3">Login</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    /* background-color: #e0bfbf; */
    border-radius: 10px;
}

/* Class selectors */
.form {
    text-align: center;
    margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: #275fda;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}

.list-group-item {
    padding: 10px;
}

.logo {
    font-size: 2rem;
    font-weight: bold;
    text-decoration: none;
    color: #000000;
}
</style>