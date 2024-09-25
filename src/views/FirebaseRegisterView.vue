<template>
    <div class="row mt-5">
        <div class="col-md-8 offset-md-2">
            <h1 class="text-center">Firebase Register</h1>
            <p><input type="text" class="form-control" placeholder="Enter your email address" v-model="email" /></p>
            <p><input type="password" class="form-control" placeholder="Enter your password" v-model="password" /></p>
            <p><button @click="register">Sign up</button></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router';
const email = ref('')
const password = ref('')
const auth = getAuth()

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Firebase Register Successful!")
            router.push("/login")
        }).catch((error) => {
            console.log(error.code);
        })
}
</script>

<style scoped></style>