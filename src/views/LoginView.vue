<script setup>
import { ref } from 'vue'
import { isAuthenticated } from '../router/index.js';
import { role } from '../router/index.js';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

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
    const email = formData.value.email; // These are plain strings now
    const password = formData.value.password;

    if (!email || !password) {
        alert("Email and password cannot be empty.");
        return;
    }

    signInWithEmailAndPassword(getAuth(), email, password)
        .then((data) => {
            alert("Login successful");
            isAuthenticated.value = true;
            router.push({ name: 'Home' });
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    alert("Invalid email format. Please try again.");
                    break;
                case 'auth/network-request-failed':
                    alert("Network error. Please check your internet connection and try again.");
                    break;
                default:
                    alert("Login failed. Please try again.");
            }
        });
};
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

<style scoped></style>
