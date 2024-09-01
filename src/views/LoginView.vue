<script setup>
import { ref } from 'vue'
import { isAuthenticated } from '../router/index.js';
import { role } from '../router/index.js';
import { useRouter } from 'vue-router';

const router = useRouter()

const formData = ref({
    email: '',
    password: ''
})

const sanitizeInput = (input) => {
    // XSS prevention by replacing special characters with hex code
    return input.replace(/[&<>"'/]/g, (char) => {
        const charMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '/': '&#x2F;',
        };
        return charMap[char] || char;
    });
};


const submitForm = () => {
    formData.value.email = sanitizeInput(formData.value.email);
    formData.value.password = sanitizeInput(formData.value.password);
    const email = formData.value.email;
    const password = formData.value.password;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    //find the user who matches the email and password in local storage
    const user = users.find(user => user.email === email && user.password === password);
    //if user exists, login successful
    if (user) {
        alert("Success")
        isAuthenticated.value = true
        role.value = user.role
        router.push({ name: 'Home' })
    } else {
        alert("Wrong email or password, please try again")
    }
}
</script>

<template>
    <div class="auth-page">
        <div class="container mt-5 auth-card">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <h1 class="text-center logo">MoodX</h1>
                    <p class="text-center">
                        Log in
                    </p>
                    <form @submit.prevent="submitForm">
                        <div class="row mb-3">
                            <div class="col-md-6 col-sm-6 col-6 offset-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="text" class="form-control" id="email" v-model="formData.email"
                                    placeholder="Enter your email address" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6 col-sm-6 col-6 offset-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" v-model="formData.password"
                                    placeholder="Enter your password" />
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary me-2 mb-3">Login</button>
                            <p class="mb-3">Don't have an account?</p>
                            <RouterLink to="/register" class="mb-3">Sign up now</RouterLink>
                        </div>
                    </form>
                </div>
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

.logo {
    font-size: 2rem;
    font-weight: bold;
    text-decoration: none;
    color: #000000;
}
</style>
