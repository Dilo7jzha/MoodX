<template>
    <div>
        <h1>Add Volunteer</h1>
        <form @submit.prevent="addVolunteer">
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <div>
                <label for="description">Description:</label>
                <input type="text" v-model="description" id="description" required />
            </div>
            <button type="submit">Add Volunteer</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import db from '@/Firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';

export default {
    name: 'AddVolunteer',
    setup() {
        const name = ref('');
        const description = ref('');

        const addVolunteer = async () => {
            try {
                await addDoc(collection(db, 'volunteers'), {
                    name: name.value,
                    description: description.value
                });
                name.value = '';
                description.value = '';
                alert('Volunteer added successfully!');
            } catch (error) {
                console.error('Error adding volunteer: ', error);
            }
        };

        return {
            name,
            description,
            addVolunteer
        };
    }
};
</script>
