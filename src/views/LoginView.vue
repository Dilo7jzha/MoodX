<script setup>
import { ref } from 'vue'
// import { isAuthenticated } from '@/router';
// import { useRouter } from 'vue-router';

const email = 'email'
const pwd = 'pwd'
// const router = useRouter()

const formData = ref({
    email: '',
    password: ''
})

// const submitForm = () => {
//     if(formData.value.username === user && formData.value.password === pwd) {
//         isAuthenticated.value = true
//         router.push({name: 'About'}) //function of useRouter
//     } else {
//         alert("Error")
//     }
// }
</script>

<template>
    <!-- 🗄️ W3. Library Registration Form -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center logo">MoodX</h1>
                <p class="text-center">
                    Log in
                </p>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="row mb-3">
                            <div class="col-md-6 col-sm-6 offset-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="text" class="form-control" id="email" v-model="formData.email"
                                    placeholder="Enter your email address" />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 col-sm-6 offset-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" v-model="formData.password"
                                    placeholder="Enter your password" />
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Login</button>
                    </div>
                    <div class="row text-center">
                        <p>Don't have an account?</p> <a href="#">Sign up now</a>
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

.logo {
    font-size: 2rem;
    font-weight: bold;
    text-decoration: none;
    color: #000000;
}
</style>
