<template>
    <div class="row mt-5">
        <div class="col-md-8 offset-md-2">
            <h1 class="text-center">Firebase Login</h1>
            <p><input type="text" class="form-control" placeholder="Enter your email address" v-model="email" /></p>
            <p><input type="password" class="form-control" placeholder="Enter your password" v-model="password" /></p>
            <p><button @click="login">Login</button></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { isAuthenticated } from '../router/index.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router';
const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            alert("Firebase Sign in Successful!")
            isAuthenticated.value = true
            router.push("/")
        }).catch((error) => {
            console.log(error.code);
        })
}
</script>

<style scoped></style>