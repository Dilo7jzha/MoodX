<script setup>

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import FloatLabel from 'primevue/floatlabel';
import Divider from 'primevue/divider';

import { ref } from 'vue'

const formData = ref({
    email: '',
    password: ''
})

const clearForm = () => {
    formData.value.email = '',
        formData.value.password = ''
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
                        <div class="col-md-9 col-sm-6 offset-3">
                            <FloatLabel>
                                <label for="email">Email</label>
                                <InputText id="email" v-model="formData.email" />
                            </FloatLabel>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-9 col-sm-6 offset-3">
                            <FloatLabel>
                                <Password v-model="formData.password" inputId="password">
                                    <template #header>
                                        <div class="font-semibold text-xm mb-4">Pick a password</div>
                                    </template>
                                    <template #footer>
                                        <Divider />
                                        <ul class="pl-2 ml-2 my-0 leading-normal">
                                            <li>At least one lowercase</li>
                                            <li>At least one uppercase</li>
                                            <li>At least one numeric</li>
                                            <li>Minimum 8 characters</li>
                                        </ul>
                                    </template>
                                </Password>
                                <label for="password">Password</label>
                            </FloatLabel>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2 mb-3">Sign Up</button>
                        <p class="mb-3">Already have an account?</p>
                        <RouterLink to="/register" class="mb-3">Login</RouterLink>
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