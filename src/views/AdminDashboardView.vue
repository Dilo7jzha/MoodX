<template>
    <div class="row mt-5">
        <div class="col-md-8 offset-md-2">
            <h1 class="text-center">Admin Dashboard</h1>
            <p>This page is for user management</p>
            <!-- Toggle buttons for Users and Volunteers -->
            <div class="mb-3 text-center">
                <button @click="currentView = 'users'"
                    :class="{ 'btn-primary': currentView === 'users', 'btn-secondary': currentView !== 'users' }">View
                    Users</button>
                <button @click="currentView = 'volunteers'"
                    :class="{ 'btn-primary': currentView === 'volunteers', 'btn-secondary': currentView !== 'volunteers' }">View
                    Volunteers</button>
            </div>

            <!-- Users List -->
            <ul v-if="currentView === 'users'">
                <li v-for="user in users" :key="user.id">
                    {{ user.username }} - email: {{ user.email }}
                    <button @click="deleteUser(user.id)">Delete</button>
                </li>
            </ul>

            <!-- Volunteers List -->
            <h1>helloworld</h1>
            <!-- <ul v-if="currentView === 'volunteers'">
                <li v-for="volunteer in volunteers" :key="volunteer.id">
                    {{ volunteer.name }} - email: {{ volunteer.email }}
                    <button @click="deleteVolunteer(volunteer.id)">Delete</button>
                </li>
            </ul> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import db from '../Firebase/init.js';

// State to manage the current view
const currentView = ref('users');
const users = ref([]);
const volunteers = ref([]);

// Fetch users from Firestore
const fetchUsers = async () => {
    try {
        const q = query(collection(db, 'users'));
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

// Fetch volunteers from Firestore
const fetchVolunteers = async () => {
    try {
        const q = query(collection(db, 'volunteers'));
        const querySnapshot = await getDocs(q);
        const volunteersArray = [];
        querySnapshot.forEach((doc) => {
            volunteersArray.push({ id: doc.id, ...doc.data() });
        });
        volunteers.value = volunteersArray;
    } catch (error) {
        console.error("Error fetching volunteers: ", error);
    }
};

// Delete user by ID
const deleteUser = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        await deleteDoc(userRef);
        alert('User deleted successfully');
        fetchUsers(); // Refresh user list after deletion
    } catch (error) {
        console.error('Error deleting user: ', error);
        alert('Error deleting user');
    }
};

// Delete volunteer by ID
// const deleteVolunteer = async (volunteerId) => {
//     try {
//         const volunteerRef = doc(db, 'volunteers', volunteerId);
//         await deleteDoc(volunteerRef);
//         alert('Volunteer deleted successfully');
//         fetchVolunteers(); // Refresh volunteer list after deletion
//     } catch (error) {
//         console.error('Error deleting volunteer: ', error);
//         alert('Error deleting volunteer');
//     }
// };

onMounted(() => {
    fetchUsers();
    // fetchVolunteers();
});
</script>

<style scoped>
.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}
</style>
