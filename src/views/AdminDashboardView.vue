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

                        <!-- Users Table -->
                        <v-data-table v-if="currentView === 'users'" :headers="userHeaders" :items="users"
                            :search="userSearch" :items-per-page="10" class="elevation-1" dense>
                            <template v-slot:top>
                                <v-text-field v-model="userSearch" label="Search users" class="mb-3"
                                    dense></v-text-field>
                            </template>
                            <template v-slot:item.action="{ item }">
                                <!-- We don't allow admin to edit user -->
                                <v-btn color="error" @click="deleteUser(item.id)">Delete</v-btn>
                            </template>
                        </v-data-table>

                        <!-- Volunteers Table -->
                        <v-data-table v-if="currentView === 'volunteers'" :headers="volunteerHeaders"
                            :items="volunteers" :search="volunteerSearch" :items-per-page="10" class="elevation-1"
                            dense>
                            <template v-slot:top>
                                <v-text-field v-model="volunteerSearch" label="Search volunteers" class="mb-3"
                                    dense></v-text-field>
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-btn color="primary" @click="openEditDialog(item)">
                                    Edit
                                </v-btn>
                                <v-btn color="error" @click="deleteVolunteer(item.id)">
                                    Delete
                                </v-btn>
                            </template>
                        </v-data-table>

                        <!-- Add Volunteer Form -->
                        <v-card v-if="currentView === 'volunteers'" class="pa-4 mt-4">
                            <v-card-title class="text-h5">Add Volunteer</v-card-title>
                            <v-form ref="form" @submit.prevent="addVolunteer">
                                <v-text-field v-model="name" label="Name" required></v-text-field>
                                <v-text-field v-model="interests" label="Interests" required></v-text-field>
                                <v-btn type="submit" color="primary">Add Volunteer</v-btn>
                            </v-form>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Edit Volunteer Dialog -->
        <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5">Edit Volunteer</v-card-title>
                <v-card-text>
                    <v-form ref="editForm">
                        <v-text-field v-model="editVolunteerData.name" label="Name" required></v-text-field>
                        <v-text-field v-model="editVolunteerData.interests" label="Interests" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="updateVolunteer">Save</v-btn>
                    <v-btn color="secondary" @click="closeEditDialog">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
        const userSearch = ref('');
        const volunteerSearch = ref('');
        const editDialog = ref(false);
        const editVolunteerData = ref({ name: '', interests: '' });

        const userHeaders = [
            { title: 'Username', key: 'username', sortable: true },
            { title: 'Email', key: 'email', sortable: true },
            { title: 'Actions', key: 'action', sortable: false }
        ];

        const volunteerHeaders = [
            { title: 'Name', key: 'name', sortable: true },
            { title: 'Interests', key: 'interests', sortable: true },
            { title: 'Actions', key: 'action', sortable: false }
        ];

        const fetchUsers = async () => {
            try {
                const q = query(collection(db, 'users'));
                const querySnapshot = await getDocs(q);
                users.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        const fetchVolunteers = async () => {
            try {
                const q = query(collection(db, 'volunteers'));
                const querySnapshot = await getDocs(q);
                volunteers.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error("Error fetching volunteers: ", error);
            }
        };

        const deleteUser = async (userId) => {
            try {
                await deleteDoc(doc(db, 'users', userId));
                alert('User deleted successfully!')
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user: ', error);
            }
        };

        const addVolunteer = async () => {
            if (!name.value.trim() || !interests.value.trim()) {
                alert('Please fill in all fields.');
                return;
            }
            try {
                await addDoc(collection(db, 'volunteers'), {
                    name: name.value,
                    interests: interests.value
                });
                name.value = '';
                interests.value = '';
                alert('Volunteer added successfully!')
                fetchVolunteers();
            } catch (error) {
                console.error('Error adding volunteer: ', error);
            }
        };

        const deleteVolunteer = async (volunteerId) => {
            try {
                await deleteDoc(doc(db, 'volunteers', volunteerId));
                alert('Volunteer deleted successfully!')
                fetchVolunteers();
            } catch (error) {
                console.error('Error deleting volunteer: ', error);
            }
        };

        const openEditDialog = (volunteer) => {
            editVolunteerData.value = { ...volunteer };
            editDialog.value = true;
        };

        const updateVolunteer = async () => {
            if (!editVolunteerData.value.name.trim() || !editVolunteerData.value.interests.trim()) {
                alert('Please fill in all fields.');
                return;
            }
            try {
                await updateDoc(doc(db, 'volunteers', editVolunteerData.value.id), {
                    name: editVolunteerData.value.name,
                    interests: editVolunteerData.value.interests
                });
                alert('Volunteer updated successfully!')
                fetchVolunteers();
                closeEditDialog();
            } catch (error) {
                console.error('Error updating volunteer: ', error);
            }
        };

        const closeEditDialog = () => {
            editDialog.value = false;
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
            userSearch,
            volunteerSearch,
            editDialog,
            editVolunteerData,
            userHeaders,
            volunteerHeaders,
            deleteUser,
            addVolunteer,
            deleteVolunteer,
            openEditDialog,
            updateVolunteer,
            closeEditDialog
        };
    }
};
</script>

<style scoped>
.v-btn {
    margin: 0.5rem;
}
</style>
