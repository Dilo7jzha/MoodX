<template>
    <div class="row mt-5">
        <div class="col-md-8 offset-md-2">
            <h1 class="text-center">Admin Dashboard</h1>
            <p>This page is for user management</p>
            <ul>
                <li v-for="user in users" :key="user.id">
                    {{ user.username }} - email: {{ user.email }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, getDocs } from 'firebase/firestore';
import db from '../Firebase/init.js';

const users = ref([]);

const fetchUsers = async () => {
    try {
        // Build Firestore query dynamically based on user input
        let q = query(collection(db, 'users'));

        const querySnapshot = await getDocs(q);
        const usersArray = [];
        querySnapshot.forEach((doc) => {
            usersArray.push({ id: doc.id, ...doc.data() });
        });
        users.value = usersArray;
    } catch (error) {
        console.error("Error fetching users: ", error);
    }
};

onMounted(() => {
    fetchUsers();
});
</script>


<style scoped></style>