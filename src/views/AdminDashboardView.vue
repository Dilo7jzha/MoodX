<template>
    <v-container class="mt-5">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-center">Admin Dashboard</v-card-title>
                    <v-card-text>
                        <p class="text-center">This page is for user and volunteer management</p>

                        <!-- Toggle buttons for Users and Volunteers -->
                        <v-btn-toggle v-model="currentView" class="d-flex justify-center mb-3">
                            <v-btn value="users" color="primary" depressed>View Users</v-btn>
                            <v-btn value="volunteers" color="primary" depressed>View Volunteers</v-btn>
                        </v-btn-toggle>

                        <!-- Users List -->
                        <v-list v-if="currentView === 'users'">
                            <v-list-item v-for="user in users" :key="user.id">
                                <v-list-item-title>{{ user.username }} - email: {{ user.email }}</v-list-item-title>
                                <v-list-item-action>
                                    <v-btn color="error" @click="deleteUser(user.id)">Delete</v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>

                        <!-- Volunteers List -->
                        <v-list v-if="currentView === 'volunteers'">
                            <v-list-item v-for="volunteer in volunteers" :key="volunteer.id">
                                <template v-if="editVolunteerId !== volunteer.id">
                                    <v-list-item-title>
                                        Name: {{ volunteer.name }} - Interests: {{ volunteer.interests }}
                                    </v-list-item-title>
                                    <v-list-item-action>
                                        <v-btn color="primary" @click="editVolunteer(volunteer)">Edit</v-btn>
                                        <v-btn color="error" @click="deleteVolunteer(volunteer.id)">Delete</v-btn>
                                    </v-list-item-action>
                                </template>

                                <!-- Edit Form -->
                                <template v-else>
                                    <v-text-field v-model="editVolunteerData.name" label="Name"></v-text-field>
                                    <v-text-field v-model="editVolunteerData.interests"
                                        label="Interests"></v-text-field>
                                    <v-btn color="success" @click="updateVolunteer(volunteer.id)">Save</v-btn>
                                    <v-btn color="secondary" @click="cancelEdit">Cancel</v-btn>
                                </template>
                            </v-list-item>
                            <!-- Add Volunteer Form -->
                            <v-card class="pa-4" mt-4>
                                <v-card-title class="text-h5">Add Volunteer</v-card-title>
                                <v-form ref="form" @submit.prevent="addVolunteer">
                                    <v-text-field v-model="name" label="Name"></v-text-field>
                                    <v-text-field v-model="interests" label="Interests"></v-text-field>
                                    <v-btn type="submit" color="primary">Add Volunteer</v-btn>
                                </v-form>
                            </v-card>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, query, getDocs, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import db from '@/Firebase/init.js';

export default {
    name: 'AdminDashboard',
    setup() {
        const name = ref('');
        const interests = ref('');
        const currentView = ref('users');
        const users = ref([]);
        const volunteers = ref([]);
        const editVolunteerId = ref(null);
        const editVolunteerData = ref({ name: '', interests: '' });

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

        const addVolunteer = async () => {
            //validation check: input can't be empty
            if (!name.value.trim() || !interests.value.trim()) {
                alert('Please fill in all fields.');
                return;
            }
            try {
                await addDoc(collection(db, 'volunteers'), {
                    name: name.value,
                    interests: interests.value
                });
                //clear input fields
                name.value = '';
                interests.value = '';
                alert('Volunteer added successfully!');
                fetchVolunteers();
            } catch (error) {
                console.error('Error adding volunteer: ', error);
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
            editVolunteerData.value = { name: volunteer.name, interests: volunteer.interests };
        };

        const updateVolunteer = async (volunteerId) => {
            if (!validateEditData()) {
                alert('Please fill in all fields.');
                return;
            }
            try {
                const volunteerRef = doc(db, 'volunteers', volunteerId);
                await updateDoc(volunteerRef, {
                    name: editVolunteerData.value.name,
                    interests: editVolunteerData.value.interests
                });
                alert('Volunteer updated successfully');
                fetchVolunteers();
                cancelEdit();
            } catch (error) {
                console.error('Error updating volunteer: ', error);
                alert('Error updating volunteer');
            }
        };

        const validateEditData = () => {
            return editVolunteerData.value.name.trim() !== '' && editVolunteerData.value.interests.trim() !== '';
        };

        const cancelEdit = () => {
            editVolunteerId.value = null;
            editVolunteerData.value = { name: '', interests: '' };
        };

        onMounted(() => {
            fetchUsers();
            fetchVolunteers();
        });

        return {
            name,
            interests,
            currentView,
            users,
            volunteers,
            editVolunteerId,
            editVolunteerData,
            deleteUser,
            addVolunteer,
            deleteVolunteer,
            editVolunteer,
            updateVolunteer,
            validateEditData,
            cancelEdit
        };
    }
};
</script>

<style scoped>
.v-btn {
    margin: 0.5rem;
}
</style>
