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
                        <v-data-table v-if="currentView === 'users'" :headers="userHeaders" :items="filteredUsers"
                            :search="userSearch" :items-per-page="10" class="elevation-1" dense>
                            <template v-slot:top>
                                <v-row class="px-4">
                                    <v-col cols="6">
                                        <v-text-field v-model="userNameSearch" label="Search by Username"
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="userEmailSearch" label="Search by Email"
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="text-right">
                                        <v-btn color="primary" @click="sendBulkEmails">Email Update</v-btn>
                                    </v-col>
                                </v-row>
                            </template>
                            <template v-slot:item.action="{ item }">
                                <!-- We don't allow admin to edit user -->
                                <v-checkbox v-model="selectedUsers" :value="item.email"></v-checkbox>
                                <v-btn color="error" @click="deleteUser(item.id)">Delete</v-btn>
                            </template>
                        </v-data-table>

                        <!-- Volunteers Table -->
                        <v-data-table v-if="currentView === 'volunteers'" :headers="volunteerHeaders"
                            :items="filteredVolunteers" :search="volunteerSearch" :items-per-page="10"
                            class="elevation-1" dense>
                            <template v-slot:top>
                                <v-row class="px-4">
                                    <v-col cols="6">
                                        <v-text-field v-model="volunteerNameSearch" label="Search by Name"
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="volunteerInterestsSearch" label="Search by Interests"
                                            dense></v-text-field>
                                    </v-col>
                                </v-row>
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
import { ref, computed, onMounted } from 'vue';
import { collection, query, getDocs, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import db from '@/Firebase/init.js';
import axios from 'axios';

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
        const selectedUsers = ref([]);

        const userHeaders = [
            { title: 'Username', key: 'username', sortable: true },
            { title: 'Email', key: 'email', sortable: true },
            { title: 'Actions (checkbox for email update)', key: 'action', sortable: false }
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

        const volunteerNameSearch = ref('');
        const volunteerInterestsSearch = ref('');

        const filteredVolunteers = computed(() => {
            return volunteers.value.filter(volunteer => {
                const matchesName = volunteer.name.toLowerCase().includes(volunteerNameSearch.value.toLowerCase());
                const matchesInterests = volunteer.interests.toLowerCase().includes(volunteerInterestsSearch.value.toLowerCase());
                return matchesName && matchesInterests;
            });
        });

        const userNameSearch = ref('');
        const userEmailSearch = ref('');

        const filteredUsers = computed(() => {
            return users.value.filter(user => {
                const matchesName = user.username.toLowerCase().includes(userNameSearch.value.toLowerCase());
                const matchesEmail = user.email.toLowerCase().includes(userEmailSearch.value.toLowerCase());
                return matchesName && matchesEmail;
            });
        });

        const sendBulkEmails = async () => {
            if (selectedUsers.value.length === 0) {
                alert('Please select at least one user to send emails.');
                return;
            }
            try {
                const response = await axios.post('https://sendbulkemails-opo4w32zbq-uc.a.run.app', {
                    emails: selectedUsers.value
                });
                alert(response.data);
            } catch (error) {
                console.error("Error sending bulk email:", error);
                alert("Failed to send bulk email.");
            }
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
            closeEditDialog,
            volunteerNameSearch,
            volunteerInterestsSearch,
            filteredVolunteers,
            userNameSearch,
            userEmailSearch,
            filteredUsers,
            sendBulkEmails,
            selectedUsers
        };
    }
};
</script>

<style scoped>
.v-btn {
    margin: 0.5rem;
}
</style>
