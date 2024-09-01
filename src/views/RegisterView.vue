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
    confirmPassword: '',
    birth: '',
})

const clearForm = () => {
    formData.value = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        birth: '',
    }
}

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

    validateName(true)
    validatePassword(true)
    validateEmail(true)

    formData.value.email = sanitizeInput(formData.value.email);
    formData.value.username = sanitizeInput(formData.value.username);
    formData.value.password = sanitizeInput(formData.value.password);
    if (!errors.value.username && !errors.value.password && !errors.value.email) {
        const email = formData.value.email;
        const username = formData.value.username;
        const password = formData.value.password;
        const birth = formData.value.birth;
        //get user info from local storage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        //identify if submited user email exists
        const isExist = users.some(user => user.email === email)//return true if at least one matches, otherwise false
        if (isExist) {
            alert("The email has already been registered")
            clearForm()
        } else {
            const role = email.toLowerCase() === 'admin@moodx.com' ? 'admin' : 'user';
            users.push({
                email: email,
                username: username,
                birth: birth,
                password: password,
                role: role,
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
}
const errors = ref({
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
    birth: null,
})
const validateName = (blur) => {
    if (formData.value.username.length < 2) {
        if (blur) errors.value.username = 'Name must be at least 2 characters'
    } else {
        errors.value.username = null
    }
}
const validatePassword = (blur) => {
    const password = formData.value.password
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
    } else if (!hasUppercase) {
        if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
    } else if (!hasLowercase) {
        if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
    } else if (!hasNumber) {
        if (blur) errors.value.password = 'Password must contain at least one number.'
    } else {
        errors.value.password = null
    }
}

const validateConfirmPassword = (blur) => {
    if (formData.value.password !== formData.value.confirmPassword) {
        if (blur) errors.value.confirmPassword = 'Passwords do not match.'
    } else {
        errors.value.confirmPassword = null
    }
}

const validateEmail = (blur) => {
    const email = formData.value.email;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format pattern

    if (email.length < 1) {
        if (blur) errors.value.email = `Email address can't be empty.`
    } else if (!emailPattern.test(email)) {
        if (blur) errors.value.email = 'Please enter a valid email address';
    } else {
        errors.value.email = null;
    }
};
</script>

<template>
    <div class="auth-page">
        <div class="container mt-5 auth-card">
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
                                <input type="email" class="form-control" id="email"
                                    placeholder="Enter your email address" @blur="() => validateEmail(true)"
                                    @input="() => validateEmail(false)" v-model="formData.email" />
                                <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                            </div>
                            <div class="col-md-6 col-sm-6 col-6">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" id="username" placeholder="Enter your username"
                                    @blur="() => validateName(true)" @input="() => validateName(false)"
                                    v-model="formData.username" />
                                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6 col-sm-6 col-6">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password"
                                    placeholder="Enter your password" @blur="() => validatePassword(true)"
                                    @input="() => validatePassword(false)" v-model="formData.password" />
                                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                            </div>
                            <div class="col-md-6 col-sm-6 col-6">
                                <label for="confirm-password" class="form-label">Confirm password</label>
                                <input type="password" class="form-control" id="confirm-password"
                                    placeholder="Confirm your password" @blur="() => validateConfirmPassword(true)"
                                    v-model="formData.confirmPassword" />
                                <div v-if="errors.confirmPassword" class="text-danger">
                                    {{ errors.confirmPassword }}
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3 justify-content-center">
                            <div class="col-md-6 col-sm-6 col-6">
                                <label for="birth" class="form-label">Date of birth (optional)</label>
                                <DatePicker v-model="formData.birth" showIcon fluid :showOnFocus="false" inputId="birth"
                                    placeholder="dd/mm/yyyy" dateFormat="dd/mm/yy" />
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