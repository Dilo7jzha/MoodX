<template>
    <div class="row mt-5">
        <div class="col-md-8 offset-md-2">
            <h1 class="text-center">Admin Dashboard</h1>
            <p>This page is for user and volunteer management</p>

            <!-- Toggle buttons for Users and Volunteers -->
            <div class="mb-3 text-center">
                <button @click="currentView = 'users'"
                    :class="{ 'btn-primary': currentView === 'users', 'btn-secondary': currentView !== 'users' }">
                    View Users
                </button>
                <button @click="currentView = 'volunteers'"
                    :class="{ 'btn-primary': currentView === 'volunteers', 'btn-secondary': currentView !== 'volunteers' }">
                    View Volunteers
                </button>
            </div>

            <!-- Users List -->
            <ul v-if="currentView === 'users'">
                <li v-for="user in users" :key="user.id">
                    {{ user.username }} - email: {{ user.email }}
                    <button @click="deleteUser(user.id)">Delete</button>
                </li>
            </ul>

            <!-- Volunteers List -->
            <ul v-if="currentView === 'volunteers'">
                <li v-for="volunteer in volunteers" :key="volunteer.id">
                    <span v-if="editVolunteerId !== volunteer.id">
                        {{ volunteer.name }} - Description: {{ volunteer.description }}
                        <button @click="editVolunteer(volunteer)">Edit</button>
                        <button @click="deleteVolunteer(volunteer.id)">Delete</button>
                    </span>

                    <!-- Edit Form -->
                    <div v-else>
                        <label>
                            Name:
                            <input type="text" v-model="editVolunteerData.name" required />
                        </label>
                        <label>
                            Description:
                            <input type="text" v-model="editVolunteerData.description" required />
                        </label>
                        <button @click="updateVolunteer(volunteer.id)">Save</button>
                        <button @click="cancelEdit">Cancel</button>
                    </div>
                </li>
                <!-- Add Volunteer Component -->
                <AddVolunteer />
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, query, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import db from '@/Firebase/init.js';
import AddVolunteer from '@/components/AddVolunteer.vue';

export default {
    name: 'AdminDashboard',
    components: {
        AddVolunteer
    },
    setup() {
        const currentView = ref('users');
        const users = ref([]);
        const volunteers = ref([]);
        const editVolunteerId = ref(null);
        const editVolunteerData = ref({ name: '', description: '' });

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

        const deleteUser = async (userId) => {
            try {
                const userRef = doc(db, 'users', userId);
                await deleteDoc(userRef);
                alert('User deleted successfully');
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user: ', error);
                alert('Error deleting user');
            }
        };

        const deleteVolunteer = async (volunteerId) => {
            try {
                const volunteerRef = doc(db, 'volunteers', volunteerId);
                await deleteDoc(volunteerRef);
                alert('Volunteer deleted successfully');
                fetchVolunteers();
            } catch (error) {
                console.error('Error deleting volunteer: ', error);
                alert('Error deleting volunteer');
            }
        };

        const editVolunteer = (volunteer) => {
            editVolunteerId.value = volunteer.id;
            editVolunteerData.value = { name: volunteer.name, description: volunteer.description };
        };

        const updateVolunteer = async (volunteerId) => {
            try {
                const volunteerRef = doc(db, 'volunteers', volunteerId);
                await updateDoc(volunteerRef, {
                    name: editVolunteerData.value.name,
                    description: editVolunteerData.value.description
                });
                alert('Volunteer updated successfully');
                fetchVolunteers();
                cancelEdit();
            } catch (error) {
                console.error('Error updating volunteer: ', error);
                alert('Error updating volunteer');
            }
        };

        const cancelEdit = () => {
            editVolunteerId.value = null;
            editVolunteerData.value = { name: '', description: '' };
        };

        onMounted(() => {
            fetchUsers();
            fetchVolunteers();
        });

        return {
            currentView,
            users,
            volunteers,
            editVolunteerId,
            editVolunteerData,
            deleteUser,
            deleteVolunteer,
            editVolunteer,
            updateVolunteer,
            cancelEdit
        };
    }
};
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
